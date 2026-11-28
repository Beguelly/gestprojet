// Escolha do provedor de IA a partir das variáveis de ambiente.
// RF-153: a IA fica desligada por padrão; quem opera liga de propósito.
import { criarGerador, mensagemDeErro, MODELO } from './ia.mjs';
import { criarGeradorGoogle, mensagemDeErroGoogle, MODELO_GOOGLE } from './ia-google.mjs';

const desligada = (motivo) => ({ gerar: null, motivo });

export function configurarIA(env) {
  if (env.IA_LIGADA?.trim().toLowerCase() !== 'sim') return desligada('IA desligada (IA_LIGADA diferente de "sim").');
  const provedor = env.IA_PROVEDOR?.trim().toLowerCase() || 'anthropic';

  if (provedor === 'google') {
    const apiKey = env.GEMINI_API_KEY?.trim();
    if (!apiKey) return desligada('Falta GEMINI_API_KEY.');
    const modelo = env.GEMINI_MODELO?.trim() || MODELO_GOOGLE;
    return { gerar: criarGeradorGoogle({ apiKey, modelo }), mensagemDeErro: mensagemDeErroGoogle, provedor: 'Google (Gemini)', modelo };
  }

  if (provedor === 'anthropic') {
    if (!(env.ANTHROPIC_API_KEY || env.ANTHROPIC_AUTH_TOKEN || env.ANTHROPIC_PROFILE)) return desligada('Falta ANTHROPIC_API_KEY.');
    return { gerar: criarGerador(), mensagemDeErro, provedor: 'Claude (Anthropic)', modelo: MODELO };
  }

  return desligada('IA_PROVEDOR desconhecido. Use "google" ou "anthropic".');
}
