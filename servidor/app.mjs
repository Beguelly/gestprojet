// Servidor do protótipo: entrega design/index.html e faz a ponte com a IA.
// A chave fica só aqui, no servidor; o navegador nunca a recebe.
// Dois usos: local (só este computador) e publicado (exigirLogin, com login conferido aqui).
import http from 'node:http';
import { createHash, timingSafeEqual } from 'node:crypto';
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
  loginsErradosPorMinuto: 20,
};

const CABECALHOS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Robots-Tag': 'noindex, nofollow',
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

// As contas de teste já estão na página como resumos (hash); no site publicado o servidor as confere.
export function extrairContas(html) {
  const bloco = html.match(/var CONTAS_TESTE = \{[\s\S]*?\r?\n {2}\};/)?.[0] ?? '';
  const sal = bloco.match(/salt: '([0-9a-f]+)'/)?.[1];
  const contas = [...bloco.matchAll(/email: '([^']+)', hash: '([0-9a-f]{64})'/g)].map(([, email, hash]) => ({ email, hash }));
  if (!sal || !contas.length) throw new Error('Contas de teste não encontradas em design/index.html');
  return { sal, contas };
}

export function loginValido(cabecalho, { sal, contas }) {
  const codigo = /^Basic ([A-Za-z0-9+/=]+)$/.exec(cabecalho ?? '')?.[1];
  if (!codigo) return false;
  const par = Buffer.from(codigo, 'base64').toString('utf8');
  const corte = par.indexOf(':');
  if (corte < 1) return false;
  const email = par.slice(0, corte).trim().toLowerCase();
  const resumo = createHash('sha256').update(`${email}:${par.slice(corte + 1)}:${sal}`).digest();
  return contas.some((c) => c.email === email && timingSafeEqual(resumo, Buffer.from(c.hash, 'hex')));
}

// Com login no servidor, a página sai sem o portão do navegador e sem os resumos das senhas.
export function paginaPublicada(html) {
  return html
    .replace('<html lang="pt-BR" class="gate-locked">', '<html lang="pt-BR">')
    .replace(/(var CONTAS_TESTE = \{[\s\S]*?contas: )\[[\s\S]*?\]/, '$1[]')
    .replace(/salt: '[0-9a-f]+'/, "salt: ''")
    .replace('</head>', '<style>#logoutBtn { display: none; }</style>\n</head>');
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
 * @param exigirLogin true no site publicado: confere e-mail e senha em todas as rotas.
 */
export function criarTratador({
  gerar = null, provedor = null, exigirLogin = false,
  mensagemDeErro = () => 'Não foi possível gerar a resposta.', registrar = () => {},
} = {}) {
  let errados = [];
  let recentes = [];
  let emAndamento = 0;

  async function perguntar(req, res) {
    const origem = req.headers.origin;
    const esperada = `${exigirLogin ? 'https' : 'http'}://${req.headers.host}`;
    if (origem && origem !== esperada) throw new PedidoInvalido(403, 'Origem não permitida.');
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

  async function conferirAcesso(req, res) {
    if (!exigirLogin) {
      // Uso local: só aceita acesso pelo próprio computador (também barra DNS rebinding).
      const porta = req.socket.localPort;
      if (![`localhost:${porta}`, `127.0.0.1:${porta}`].includes(req.headers.host)) {
        throw new PedidoInvalido(403, 'Endereço não permitido.');
      }
      return true;
    }
    const contas = extrairContas(await readFile(PAGINA, 'utf8'));
    if (loginValido(req.headers.authorization, contas)) return true;
    if (req.headers.authorization) {
      const agora = Date.now();
      errados = errados.filter((t) => agora - t < 60_000);
      errados.push(agora);
      if (errados.length > LIMITES.loginsErradosPorMinuto) throw new PedidoInvalido(429, 'Muitas tentativas. Aguarde um minuto.');
    }
    res.setHeader('WWW-Authenticate', 'Basic realm="GestProjet - acesso de teste", charset="UTF-8"');
    responder(res, 401, { erro: 'Acesso restrito aos participantes do teste.' });
    return false;
  }

  return async function tratar(req, res) {
    try {
      if (!(await conferirAcesso(req, res))) return;
      const caminho = new URL(req.url, 'http://localhost').pathname;
      if (req.method === 'GET' && (caminho === '/' || caminho === '/index.html')) {
        const original = await readFile(PAGINA, 'utf8');
        const html = exigirLogin ? paginaPublicada(original) : original;
        res.writeHead(200, { ...CABECALHOS, 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': CSP });
        return res.end(html);
      }
      if (req.method === 'GET' && caminho === '/api/ia/status') return responder(res, 200, { ligada: Boolean(gerar), provedor: gerar ? provedor : null });
      if (req.method === 'POST' && caminho === '/api/ia') return await perguntar(req, res);
      throw new PedidoInvalido(404, 'Não encontrado.');
    } catch (erro) {
      if (res.headersSent) return res.end();
      if (erro instanceof PedidoInvalido) return responder(res, erro.status, { erro: erro.message });
      registrar(`erro interno tipo=${erro?.constructor?.name}`);
      return responder(res, 500, { erro: 'Erro interno.' });
    }
  };
}

export function criarServidor(opcoes) {
  return http.createServer(criarTratador(opcoes));
}
