// Testes da agenda, sem rede: e-mail e WhatsApp são substituídos por dublês.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { criarServidor, LIMITES } from './app.mjs';
import { validarConvite, normalizarTelefone, textoConvite, arquivoAgenda } from './convites.mjs';
import { criarEmail } from './email.mjs';
import { criarWhatsApp } from './whatsapp.mjs';

const convite = (extra = {}) => ({
  canais: ['email', 'whatsapp'],
  participantes: [
    { nome: 'Ana', email: 'ana@exemplo.test', telefone: '(95) 99999-0001' },
    { nome: 'Bia', email: 'bia@exemplo.test', telefone: '' },
  ],
  reuniao: { titulo: 'Alinhamento', inicio: '2026-12-04T14:00:00.000Z', duracaoMin: 60, local: 'Sala 1', pauta: 'Metas; prazos', fuso: 'America/Boa_Vista' },
  ...extra,
});

function dubles({ estado = 'conectado' } = {}) {
  const feitos = [];
  return {
    feitos,
    email: { remetente: 'projeto@exemplo.test', async enviar(m) { feitos.push(['email', m.para, m]); } },
    whatsapp: {
      situacao: () => ({ estado, qr: null, numero: null, aviso: null }),
      async conectar() { feitos.push(['conectar']); },
      async sair() { feitos.push(['sair']); },
      async enviar(telefone, texto) { feitos.push(['whatsapp', telefone, texto]); },
    },
    pausa: async () => {},
  };
}

async function comServidor(opcoes, usar) {
  const servidor = criarServidor(opcoes);
  await new Promise((ok) => servidor.listen(0, '127.0.0.1', ok));
  try {
    await usar(`http://127.0.0.1:${servidor.address().port}`);
  } finally {
    servidor.closeAllConnections();
    servidor.close();
  }
}
const postar = (base, caminho, corpo = {}, cabecalhos = {}) =>
  fetch(base + caminho, { method: 'POST', headers: { 'Content-Type': 'application/json', ...cabecalhos }, body: JSON.stringify(corpo) });

test('telefone: assume Brasil só sem código do país', () => {
  assert.equal(normalizarTelefone('(95) 99999-0001'), '5595999990001');
  assert.equal(normalizarTelefone('+351 912 345 678'), '351912345678');
  assert.equal(normalizarTelefone(''), '');
  assert.throws(() => normalizarTelefone('123'));
});

test('convite: recusa dados inválidos e quebra de linha em cabeçalho', () => {
  assert.throws(() => validarConvite(convite({ canais: [] })));
  assert.throws(() => validarConvite(convite({ participantes: [] })));
  assert.throws(() => validarConvite(convite({ participantes: [{ nome: 'X', email: 'a@b.com, c@d.com' }] })));
  assert.throws(() => validarConvite(convite({ participantes: Array.from({ length: 21 }, () => ({ nome: 'X', email: 'x@y.test' })) })));
  const v = validarConvite(convite({ reuniao: { ...convite().reuniao, titulo: 'A\r\nBcc: invasor@x.test' } }));
  assert.doesNotMatch(v.reuniao.titulo, /[\r\n]/);
});

test('texto e arquivo de agenda', () => {
  const { reuniao } = validarConvite(convite());
  assert.match(textoConvite(reuniao, 'Ana'), /Olá, Ana![\s\S]*10:00[\s\S]*Sala 1/);
  const ics = arquivoAgenda({ ...reuniao, pauta: `linha 1\nlinha 2 ${'ç'.repeat(100)}` });
  assert.match(ics, /DTSTART:20261204T140000Z\r\nDTEND:20261204T150000Z/);
  assert.match(ics, /DESCRIPTION:linha 1\\nlinha 2/);
  assert.ok(ics.split('\r\n').every((l) => Buffer.byteLength(l) <= 75));
});

test('envio: uma mensagem por pessoa e relatório de quem não tem contato', async () => {
  const d = dubles();
  await comServidor(d, async (base) => {
    const r = await postar(base, '/api/convites', convite());
    assert.equal(r.status, 200);
    const { resultados } = await r.json();
    assert.deepEqual(resultados.map((x) => [x.nome, x.canal, x.ok]), [['Ana', 'email', true], ['Ana', 'whatsapp', true], ['Bia', 'email', true], ['Bia', 'whatsapp', false]]);
    assert.deepEqual(d.feitos.map((f) => f.slice(0, 2)), [['email', 'ana@exemplo.test'], ['whatsapp', '5595999990001'], ['email', 'bia@exemplo.test']]);
  });
});

test('falha de um envio não interrompe os outros nem vaza detalhe', async () => {
  const d = dubles();
  d.email.enviar = async () => { throw new Error('senha-secreta'); };
  await comServidor(d, async (base) => {
    const corpo = await (await postar(base, '/api/convites', convite())).text();
    assert.doesNotMatch(corpo, /senha-secreta/);
    assert.equal(JSON.parse(corpo).resultados.filter((x) => x.ok).length, 1);
  });
});

test('WhatsApp desconectado, origem externa e limite por hora bloqueiam', async () => {
  const desligado = dubles({ estado: 'desconectado' });
  await comServidor(desligado, async (base) => {
    assert.equal((await postar(base, '/api/convites', convite())).status, 409);
    assert.equal((await postar(base, '/api/convites', convite(), { Origin: 'https://invasor.example' })).status, 403);
    assert.equal((await postar(base, '/api/whatsapp/conectar', {}, { Origin: 'https://invasor.example' })).status, 403);
    assert.equal(desligado.feitos.length, 0);
  });
  await comServidor(dubles(), async (base) => {
    const cheio = convite({ canais: ['email'], participantes: Array.from({ length: 20 }, (_, i) => ({ nome: `P${i}`, email: `p${i}@exemplo.test` })) });
    for (let i = 0; i < LIMITES.mensagensPorHora / 20; i++) assert.equal((await postar(base, '/api/convites', cheio)).status, 200);
    assert.equal((await postar(base, '/api/convites', cheio)).status, 429);
  });
});

test('site publicado nunca envia nem conecta, mesmo recebendo as integrações', async () => {
  const d = dubles();
  await comServidor({ ...d, exigirLogin: true }, async (base) => {
    for (const caminho of ['/api/convites', '/api/whatsapp/conectar', '/api/whatsapp/sair']) {
      assert.equal((await postar(base, caminho, convite())).status, 401, caminho);
    }
    assert.equal((await fetch(`${base}/api/integracoes`)).status, 401);
    assert.equal(d.feitos.length, 0);
  });
});

test('e-mail: destinatário único, assunto e agenda anexa', async () => {
  let enviado;
  const correio = criarEmail({ usuario: 'eu@exemplo.test', transporte: { async sendMail(m) { enviado = m; } } });
  await correio.enviar({ para: 'ana@exemplo.test', assunto: 'Convite', texto: 't', agenda: 'BEGIN:VCALENDAR' });
  assert.equal(enviado.to, 'ana@exemplo.test');
  assert.equal(enviado.icalEvent.content, 'BEGIN:VCALENDAR');
});

function bibliotecaFalsa() {
  const sockets = [];
  return {
    sockets,
    carregar: async () => ({
      useMultiFileAuthState: async () => ({ state: { creds: {} }, saveCreds() {} }),
      DisconnectReason: { loggedOut: 401, restartRequired: 515 },
      desenharQr: async (t) => `data:image/png;base64,${t}`,
      criarSocket: () => {
        const s = {
          ouvintes: {}, enviados: [], ev: { on: (n, f) => { s.ouvintes[n] = f; } },
          onWhatsApp: async (n) => (n.endsWith('0') ? [] : [{ exists: true, jid: `${n}@s.whatsapp.net` }]),
          sendMessage: async (...a) => { s.enviados.push(a); },
          logout: async () => {},
        };
        sockets.push(s);
        return s;
      },
    }),
  };
}

test('WhatsApp: código, conexão, envio e remoção do aparelho', async () => {
  const pasta = await mkdtemp(path.join(tmpdir(), 'gp-zap-'));
  const lib = bibliotecaFalsa();
  const zap = criarWhatsApp({ pasta, carregar: lib.carregar });
  await assert.rejects(zap.enviar('5595999990001', 'oi'));
  await zap.conectar();
  const [s] = lib.sockets;
  await s.ouvintes['connection.update']({ qr: 'abc' });
  assert.deepEqual([zap.situacao().estado, zap.situacao().qr], ['aguardando_qr', 'data:image/png;base64,abc']);
  s.user = { id: '5595999991234:7@s.whatsapp.net' };
  await s.ouvintes['connection.update']({ connection: 'open' });
  assert.equal(zap.situacao().numero, '5595999991234');
  await zap.enviar('5595999990001', 'oi');
  assert.deepEqual(s.enviados, [['5595999990001@s.whatsapp.net', { text: 'oi' }]]);
  await assert.rejects(zap.enviar('5595999990000', 'oi'), { publica: /não foi encontrado/ });
  await writeFile(path.join(pasta, 'creds.json'), '{}');
  assert.equal(zap.temSessao(), true);
  await s.ouvintes['connection.update']({ connection: 'close', lastDisconnect: { error: { output: { statusCode: 401 } } } });
  assert.equal(zap.situacao().estado, 'desconectado');
  assert.equal(existsSync(pasta), false);
});

test('WhatsApp: código expirado não fica tentando sozinho', async () => {
  const lib = bibliotecaFalsa();
  const zap = criarWhatsApp({ pasta: path.join(tmpdir(), 'gp-zap-inexistente'), carregar: lib.carregar, espera: 1 });
  await zap.conectar();
  await lib.sockets[0].ouvintes['connection.update']({ connection: 'close', lastDisconnect: { error: { output: { statusCode: 408 } } } });
  await new Promise((ok) => setTimeout(ok, 30));
  assert.equal(lib.sockets.length, 1);
  assert.match(zap.situacao().aviso, /Conectar/);
});
