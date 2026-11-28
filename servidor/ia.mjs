// Adaptador do provedor de IA (RNF-26: o provedor é substituível).
// Trocar de provedor significa reescrever só este arquivo.
import Anthropic from '@anthropic-ai/sdk';

export const MODELO = 'claude-opus-5-5';

export function criarGerador(cliente = new Anthropic()) {
  return async function gerar({ sistema, mensagens, sinal, aoTexto }) {
    const stream = cliente.beta.messages.stream(
      {
        model: MODELO,
        max_tokens: 16000,
        // Se o modelo recusar por política, a API repete o pedido em um modelo reserva.
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
        output_config: { effort: 'low' },
        system: sistema,
        messages: mensagens,
      },
      { signal: sinal },
    );
    stream.on('text', aoTexto);
    const final = await stream.finalMessage();
    return { motivo: final.stop_reason, modelo: final.model, uso: final.usage };
  };
}

// Mensagem segura para a tela: nunca devolve o texto bruto do erro (pode citar dados do pedido).
export function mensagemDeErro(erro) {
  if (erro instanceof Anthropic.AuthenticationError) return 'A chave de IA foi recusada. Confira o arquivo .env.';
  if (erro instanceof Anthropic.PermissionDeniedError) return 'A chave de IA não tem permissão para este modelo.';
  if (erro instanceof Anthropic.RateLimitError) return 'Limite de uso da IA atingido. Tente novamente em instantes.';
  if (erro instanceof Anthropic.APIConnectionError) return 'Sem conexão com o provedor de IA.';
  if (erro instanceof Anthropic.APIError) return `O provedor de IA devolveu um erro (${erro.status ?? 'sem código'}).`;
  return 'Não foi possível gerar a resposta.';
}
