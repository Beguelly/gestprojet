// WhatsApp por API NÃO OFICIAL (biblioteca Baileys), pareado como um "aparelho conectado".
// Atenção: contraria os Termos do WhatsApp e o número pode ser bloqueado. Use poucas mensagens,
// só para quem espera recebê-las. Funciona apenas no servidor local, que fica ligado.
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import path from 'node:path';

const carregarBiblioteca = async () => {
  const [baileys, pino, qrcode] = await Promise.all([import('baileys'), import('pino'), import('qrcode')]);
  return {
    criarSocket: baileys.default,
    useMultiFileAuthState: baileys.useMultiFileAuthState,
    DisconnectReason: baileys.DisconnectReason,
    buscarVersao: baileys.fetchLatestBaileysVersion,
    registro: pino.default({ level: 'silent' }),
    desenharQr: (texto) => qrcode.default.toDataURL(texto, { margin: 2, width: 280 }),
  };
};

export function criarWhatsApp({ pasta, carregar = carregarBiblioteca, registrar = () => {}, espera = 1500 }) {
  let socket = null;
  let estado = 'desconectado';
  let qr = null;
  let numero = null;
  let aviso = null;
  let tentativas = 0;
  let abrindo = null;

  const apagarSessao = () => rm(pasta, { recursive: true, force: true });

  function encerrar(novoEstado = 'desconectado') {
    socket = null;
    estado = novoEstado;
    qr = null;
    numero = null;
  }

  async function abrir() {
    const lib = await carregar();
    const { state, saveCreds } = await lib.useMultiFileAuthState(pasta);
    const versao = await lib.buscarVersao?.().catch(() => null);
    const atual = lib.criarSocket({
      auth: state,
      logger: lib.registro,
      ...(versao?.version ? { version: versao.version } : {}),
      markOnlineOnConnect: false,
      syncFullHistory: false,
    });
    socket = atual;
    atual.ev.on('creds.update', saveCreds);
    atual.ev.on('connection.update', async ({ connection, lastDisconnect, qr: codigo }) => {
      if (socket !== atual) return; // aviso atrasado de uma conexão antiga
      if (codigo) {
        const imagem = await lib.desenharQr(codigo);
        if (socket !== atual) return;
        qr = imagem;
        estado = 'aguardando_qr';
      }
      if (connection === 'open') {
        estado = 'conectado';
        qr = null;
        aviso = null;
        tentativas = 0;
        numero = atual.user?.id?.split(/[:@]/)[0] ?? null;
        registrar('whatsapp conectado');
      }
      if (connection === 'close') {
        const motivo = lastDisconnect?.error?.output?.statusCode;
        const pareado = Boolean(state.creds?.registered || state.creds?.me);
        registrar(`whatsapp desconectado motivo=${motivo ?? '-'}`);
        if (motivo === lib.DisconnectReason.loggedOut) {
          encerrar();
          aviso = 'O aparelho foi removido no WhatsApp. Conecte de novo.';
          await apagarSessao();
        } else if ((motivo === lib.DisconnectReason.restartRequired || pareado) && tentativas < 5) {
          // Reinício pedido logo após a leitura do QR, ou queda de uma sessão já pareada.
          tentativas++;
          encerrar('conectando');
          setTimeout(() => iniciar().catch(() => {}), espera * tentativas).unref?.();
        } else {
          encerrar();
          aviso = pareado ? 'A conexão caiu. Clique em Conectar.' : 'O código expirou ou a conexão foi recusada. Clique em Conectar.';
        }
      }
    });
  }

  function iniciar() {
    if (socket) return Promise.resolve();
    if (!abrindo) {
      estado = 'conectando';
      aviso = null;
      abrindo = abrir()
        .catch((erro) => {
          encerrar();
          aviso = 'Não foi possível iniciar a conexão com o WhatsApp.';
          registrar(`whatsapp erro tipo=${erro?.constructor?.name}`);
        })
        .finally(() => { abrindo = null; });
    }
    return abrindo;
  }

  return {
    iniciar,
    conectar() {
      tentativas = 0;
      return iniciar();
    },
    temSessao: () => existsSync(path.join(pasta, 'creds.json')),
    situacao: () => ({ estado, qr, numero, aviso }),
    async sair() {
      const atual = socket;
      encerrar();
      aviso = null;
      try {
        await atual?.logout();
      } catch {
        // mesmo sem rede, a sessão local é apagada
      }
      await apagarSessao();
    },
    async enviar(telefone, texto) {
      if (estado !== 'conectado' || !socket) throw new Error('WhatsApp desconectado');
      const [contato] = (await socket.onWhatsApp(telefone)) ?? [];
      if (!contato?.exists) {
        const erro = new Error('Número sem WhatsApp');
        erro.publica = 'Este número não foi encontrado no WhatsApp.';
        throw erro;
      }
      await socket.sendMessage(contato.jid, { text: texto });
    },
  };
}
