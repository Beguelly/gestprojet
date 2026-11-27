// Servidor local do protótipo: entrega design/index.html e faz a ponte com a IA.
// A chave fica só aqui, no servidor; o navegador nunca a recebe.
import http from 'node:http';
import { readFile } from 'node:fs/promises';

const PAGINA = new URL('../design/index.html', import.meta.url);

export const LIMITES = {
  corpoBytes: 128 * 1024,
  pergunta: 1000,
  titulo: 200,
  tela: 24000,
  turnos: 6,
  turno: 8000,
  porMinuto: 20,
  simultaneos: 2,
};

const CABECALHOS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Cache-Control': 'no-store',
};

const CSP =
  "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; " +
  "img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'";

class PedidoInvalido extends Error {
  constructor(status, mensagem) {
    super(mensagem);
    this.status = status;
  }
}

// As regras do assistente moram na própria página, para valerem igual em todos os modos.
export function extrairRegras(html) {
  const achado = html.match(/<script type="text\/plain" id="ia-regras">([\s\S]*?)<\/script>/);
  if (!achado) throw new Error('Bloco de regras do assistente não encontrado em design/index.html');
  return achado[1].trim();
}

function texto(valor, maximo, nome, { vazio = false } = {}) {
  if (typeof valor !== 'string' || (!vazio && !valor.trim())) throw new PedidoInvalido(400, `Campo ausente: ${nome}.`);
  if (valor.length > maximo) throw new PedidoInvalido(413, `Campo grande demais: ${nome}.`);
  return valor;
}

export function montarMensagens(corpo) {
  if (!corpo || typeof corpo !== 'object') throw new PedidoInvalido(400, 'Pedido inválido.');
  const pergunta = texto(corpo.pergunta, LIMITES.pergunta, 'pergunta');
  const titulo = texto(corpo.tela?.titulo, LIMITES.titulo, 'título da tela');
  const conteudo = texto(corpo.tela?.texto, LIMITES.tela, 'texto da tela', { vazio: true });
  const historico = corpo.historico ?? [];
  if (!Array.isArray(historico) || historico.length > LIMITES.turnos || historico.length % 2 !== 0) {
    throw new PedidoInvalido(400, 'Histórico inválido.');
  }
  const anteriores = historico.map((turno, i) => {
    const papel = i % 2 === 0 ? 'user' : 'assistant';
    if (turno?.papel !== papel) throw new PedidoInvalido(400, 'Histórico fora de ordem.');
    return { role: papel, content: texto(turno.texto, LIMITES.turno, 'histórico') };
  });
  // O texto da tela é dado, nunca instrução (RN-015): não pode fechar a própria marcação.
  const limpo = (s) => s.replace(/<(\/?)\s*tela/gi, '‹$1tela');
  const atual = `<tela titulo="${limpo(titulo).replace(/"/g, "'")}">\n${limpo(conteudo)}\n</tela>\n\nPergunta: ${pergunta}`;
  return [...anteriores, { role: 'user', content: atual }];
}

async function lerCorpo(req) {
  const partes = [];
  let total = 0;
  for await (const parte of req) {
    total += parte.length;
    if (total > LIMITES.corpoBytes) throw new PedidoInvalido(413, 'Pedido grande demais.');
    partes.push(parte);
  }
  try {
    return JSON.parse(Buffer.concat(partes).toString('utf8'));
  } catch {
    throw new PedidoInvalido(400, 'JSON inválido.');
  }
}

function responder(res, status, dados) {
  res.writeHead(status, { ...CABECALHOS, 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(dados));
}

/**
 * @param gerar função do adaptador de IA, ou null quando a IA está desligada.
 */
export function criarServidor({ gerar = null, mensagemDeErro = () => 'Não foi possível gerar a resposta.', registrar = () => {} } = {}) {
  let recentes = [];
  let emAndamento = 0;

  async function perguntar(req, res) {
    const origem = req.headers.origin;
    if (origem && origem !== `http://${req.headers.host}`) throw new PedidoInvalido(403, 'Origem não permitida.');
    if (!/^application\/json\b/i.test(req.headers['content-type'] ?? '')) throw new PedidoInvalido(415, 'Envie JSON.');
    if (!gerar) throw new PedidoInvalido(503, 'A IA está desligada neste servidor.');

    const mensagens = montarMensagens(await lerCorpo(req));
    const sistema = extrairRegras(await readFile(PAGINA, 'utf8'));

    const agora = Date.now();
    recentes = recentes.filter((t) => agora - t < 60_000);
    if (recentes.length >= LIMITES.porMinuto || emAndamento >= LIMITES.simultaneos) {
      throw new PedidoInvalido(429, 'Muitas perguntas seguidas. Aguarde um pouco.');
    }
    recentes.push(agora);
    emAndamento++;

    const cancelar = new AbortController();
    res.on('close', () => { if (!res.writableEnded) cancelar.abort(); });
    res.writeHead(200, { ...CABECALHOS, 'Content-Type': 'application/x-ndjson; charset=utf-8' });
    res.flushHeaders();
    const linha = (dados) => { if (!res.destroyed) res.write(JSON.stringify(dados) + '\n'); };

    try {
      const fim = await gerar({ sistema, mensagens, sinal: cancelar.signal, aoTexto: (t) => linha({ t }) });
      if (fim.motivo === 'refusal') linha({ erro: 'A IA não respondeu a este pedido. Reformule a pergunta.', descartar: true });
      else linha({ fim: true, truncado: fim.motivo === 'max_tokens' });
      // Registro sem conteúdo: só o necessário para acompanhar custo e falhas.
      registrar(`ia ok motivo=${fim.motivo} modelo=${fim.modelo} entrada=${fim.uso?.input_tokens} saida=${fim.uso?.output_tokens}`);
    } catch (erro) {
      if (!cancelar.signal.aborted) {
        registrar(`ia erro tipo=${erro?.constructor?.name} status=${erro?.status ?? '-'}`);
        linha({ erro: mensagemDeErro(erro) });
      }
    } finally {
      emAndamento--;
      res.end();
    }
  }

  return http.createServer(async (req, res) => {
    try {
      // Só aceita acesso pelo próprio computador (também barra DNS rebinding).
      const porta = req.socket.localPort;
      if (![`localhost:${porta}`, `127.0.0.1:${porta}`].includes(req.headers.host)) {
        throw new PedidoInvalido(403, 'Endereço não permitido.');
      }
      const caminho = new URL(req.url, 'http://localhost').pathname;
      if (req.method === 'GET' && (caminho === '/' || caminho === '/index.html')) {
        const html = await readFile(PAGINA);
        res.writeHead(200, { ...CABECALHOS, 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': CSP });
        return res.end(html);
      }
      if (req.method === 'GET' && caminho === '/api/ia/status') return responder(res, 200, { ligada: Boolean(gerar) });
      if (req.method === 'POST' && caminho === '/api/ia') return await perguntar(req, res);
      throw new PedidoInvalido(404, 'Não encontrado.');
    } catch (erro) {
      if (res.headersSent) return res.end();
      if (erro instanceof PedidoInvalido) return responder(res, erro.status, { erro: erro.message });
      registrar(`erro interno tipo=${erro?.constructor?.name}`);
      return responder(res, 500, { erro: 'Erro interno.' });
    }
  });
}
