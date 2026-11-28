// Adaptador do Google Gemini (RNF-26: o provedor é substituível).
import { GoogleGenAI, ApiError } from '@google/genai';

export const MODELO_GOOGLE = 'gemini-3.5-flash-lite';

export function criarGeradorGoogle({ apiKey, modelo = MODELO_GOOGLE, cliente = new GoogleGenAI({ apiKey }) }) {
  return async function gerar({ sistema, mensagens, sinal, aoTexto }) {
    const stream = await cliente.models.generateContentStream({
      model: modelo,
      contents: mensagens.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      config: { systemInstruction: sistema, maxOutputTokens: 8000, abortSignal: sinal },
    });
    let fim;
    let bloqueado = false;
    let uso;
    for await (const parte of stream) {
      if (parte.text) aoTexto(parte.text);
      fim = parte.candidates?.[0]?.finishReason ?? fim;
      if (parte.promptFeedback?.blockReason) bloqueado = true;
      uso = parte.usageMetadata ?? uso;
    }
    // Sem motivo de término, a resposta foi cortada no caminho: não vale como completa.
    if (!fim && !bloqueado) throw new Error('Resposta interrompida');
    const motivo = fim === 'STOP' ? 'end_turn' : fim === 'MAX_TOKENS' ? 'max_tokens' : 'refusal';
    return { motivo, modelo, uso: { input_tokens: uso?.promptTokenCount, output_tokens: uso?.candidatesTokenCount } };
  };
}

// Mensagem segura para a tela: nunca devolve o texto bruto do erro.
export function mensagemDeErroGoogle(erro) {
  if (erro instanceof ApiError) {
    if ([400, 401, 403].includes(erro.status)) return 'O Google recusou o pedido. Confira a chave e o modelo configurados.';
    if (erro.status === 404) return 'O modelo de IA configurado não está disponível.';
    if (erro.status === 429) return 'Limite de uso da IA atingido. Tente novamente em instantes.';
    if (erro.status >= 500) return 'A IA do Google está sobrecarregada ou indisponível. Tente novamente.';
    return `O provedor de IA devolveu um erro (${erro.status}).`;
  }
  return 'Não foi possível gerar a resposta.';
}
