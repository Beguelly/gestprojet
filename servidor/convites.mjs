// Validação do pedido de convite e montagem do texto e do arquivo de agenda (.ics).
// O texto é montado aqui, a partir de campos: o navegador não envia mensagem livre.
import { randomUUID } from 'node:crypto';

export const LIMITES_CONVITE = { participantes: 20, titulo: 120, nome: 80, local: 200, pauta: 1000 };

export class ConviteInvalido extends Error {}

const EMAIL = /^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]+$/;

function campo(valor, maximo, nome, { vazio = false, linhas = false } = {}) {
  if (valor === undefined && vazio) return '';
  if (typeof valor !== 'string') throw new ConviteInvalido(`Campo inválido: ${nome}.`);
  const limpo = (linhas ? valor.replace(/\r\n?/g, '\n') : valor.replace(/[\r\n\t]+/g, ' ')).trim();
  if (!limpo && !vazio) throw new ConviteInvalido(`Preencha: ${nome}.`);
  if (limpo.length > maximo) throw new ConviteInvalido(`Texto grande demais: ${nome}.`);
  return limpo;
}

// Número com código do país. Sem ele (10 ou 11 dígitos), assume Brasil.
export function normalizarTelefone(valor) {
  const texto = String(valor ?? '').trim();
  const digitos = texto.replace(/\D/g, '');
  if (!digitos) return '';
  const completo = !texto.startsWith('+') && (digitos.length === 10 || digitos.length === 11) ? `55${digitos}` : digitos;
  if (completo.length < 11 || completo.length > 15) throw new ConviteInvalido(`Telefone inválido: ${texto}.`);
  return completo;
}

export function validarConvite(corpo) {
  const r = corpo?.reuniao ?? {};
  const inicio = new Date(typeof r.inicio === 'string' ? r.inicio : NaN);
  if (Number.isNaN(inicio.getTime())) throw new ConviteInvalido('Data ou horário inválido.');
  const duracaoMin = Number(r.duracaoMin);
  if (!Number.isInteger(duracaoMin) || duracaoMin < 15 || duracaoMin > 480) throw new ConviteInvalido('Duração inválida.');
  let fuso = campo(r.fuso, 60, 'fuso horário', { vazio: true }) || 'America/Sao_Paulo';
  try {
    new Intl.DateTimeFormat('pt-BR', { timeZone: fuso });
  } catch {
    throw new ConviteInvalido('Fuso horário inválido.');
  }
  const canais = [...new Set(Array.isArray(corpo.canais) ? corpo.canais : [])];
  if (!canais.length || canais.some((c) => c !== 'email' && c !== 'whatsapp')) throw new ConviteInvalido('Escolha o canal de envio.');
  const lista = corpo.participantes;
  if (!Array.isArray(lista) || !lista.length) throw new ConviteInvalido('Inclua ao menos um participante.');
  if (lista.length > LIMITES_CONVITE.participantes) throw new ConviteInvalido(`No máximo ${LIMITES_CONVITE.participantes} participantes por envio.`);
  const participantes = lista.map((p) => {
    const nome = campo(p?.nome, LIMITES_CONVITE.nome, 'nome do participante');
    const email = campo(p?.email, 120, 'e-mail', { vazio: true });
    if (email && !EMAIL.test(email)) throw new ConviteInvalido(`E-mail inválido: ${email}.`);
    return { nome, email, telefone: normalizarTelefone(p?.telefone) };
  });
  return {
    canais,
    participantes,
    reuniao: {
      titulo: campo(r.titulo, LIMITES_CONVITE.titulo, 'título'),
      local: campo(r.local, LIMITES_CONVITE.local, 'local ou link', { vazio: true }),
      pauta: campo(r.pauta, LIMITES_CONVITE.pauta, 'pauta', { vazio: true, linhas: true }),
      inicio,
      duracaoMin,
      fuso,
    },
  };
}

export function textoConvite(reuniao, nome) {
  const quando = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short', timeZone: reuniao.fuso }).format(reuniao.inicio);
  return [
    `Olá, ${nome}!`,
    '',
    `Convite para reunião: ${reuniao.titulo}`,
    `Quando: ${quando} (${reuniao.fuso})`,
    `Duração: ${reuniao.duracaoMin} minutos`,
    reuniao.local ? `Local ou link: ${reuniao.local}` : null,
    reuniao.pauta ? `Pauta: ${reuniao.pauta}` : null,
    '',
    'Enviado pela GestProjet.',
  ].filter((l) => l !== null).join('\n');
}

const escapar = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const instante = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

// A norma limita cada linha a 75 bytes; a continuação começa com espaço.
function dobrar(linha) {
  let saida = '';
  let tamanho = 0;
  for (const letra of linha) {
    const bytes = Buffer.byteLength(letra);
    if (tamanho + bytes > 74) {
      saida += '\r\n ';
      tamanho = 1;
    }
    saida += letra;
    tamanho += bytes;
  }
  return saida;
}

export function arquivoAgenda(reuniao, { uid = `${randomUUID()}@gestprojet`, agora = new Date() } = {}) {
  const fim = new Date(reuniao.inicio.getTime() + reuniao.duracaoMin * 60_000);
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//GestProjet//Agenda//PT-BR', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    `UID:${uid}`, `DTSTAMP:${instante(agora)}`, `DTSTART:${instante(reuniao.inicio)}`, `DTEND:${instante(fim)}`,
    `SUMMARY:${escapar(reuniao.titulo)}`,
    reuniao.local ? `LOCATION:${escapar(reuniao.local)}` : null,
    reuniao.pauta ? `DESCRIPTION:${escapar(reuniao.pauta)}` : null,
    'END:VEVENT', 'END:VCALENDAR',
  ].filter(Boolean).map(dobrar).join('\r\n') + '\r\n';
}
