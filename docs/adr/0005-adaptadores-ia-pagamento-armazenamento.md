# ADR-0005: Adaptadores para IA, pagamento, armazenamento, antimalware e leitor

Status: proposto · Data: 2026-11-25 · SPEC: seções 3.2 e 7.8 · RNF-26, SEG-122, SEG-141, SEG-265, SEG-271

## Contexto

O provedor de IA é o Claude (Anthropic), mas a forma de contratação (API direta ou plataforma cloud) e os termos estão em aberto (Q-24), e a leitura de PDF e imagem fica **desligada** até haver contrato e RIPD. A empresa de pagamento está em aberto (T-801). O produto precisa funcionar com qualquer uma e sem IA.

## Opções

1. Chamar os SDKs dos fornecedores direto no código de negócio (rápido, acopla e impede trocar).
2. **Portas com interface própria e adaptadores substituíveis** (escolhida).

## Decisão

Portas `IaPort`, `PagamentoPort`, `ArmazenamentoPort`, `AntimalwarePort`, `LeitorPort`, `CifraPort`, `EmailPort`, `BuscaPort` e `RelogioPort`, definidas com esquemas em `packages/portas`; adaptadores em `packages/adaptadores`; **cada porta tem um *mock* ou *fake*** usado nos testes e como padrão em desenvolvimento e homologação.

- **IaPort**: entrada = derivados do documento e instruções fixas; saída = esquema rígido validado pelo servidor; devolve provedor, modelo e **versão exata**. Nada de regra de negócio, prompt ou esquema depende de característica exclusiva de um provedor. Trocar de provedor, modelo ou forma de contratação é configuração mais contrato, RIPD, lista de suboperadores e reexecução dos testes adversariais e de acurácia; **nunca troca silenciosa** nem alternativa automática para provedor não contratado. A flag de IA tem três níveis (ambiente, cliente, projeto) e **só restringe** nos níveis inferiores.
- **PagamentoPort**: `criarCobranca`, `consultarSituacao`, `verificarWebhook(cabeçalhos, corpo bruto)` que devolve evento normalizado com identificador único, `cancelar`. A captura é hospedada pelo provedor; webhook é a **única** fonte de "pago".
- **AntimalwarePort**: motor **auto-hospedado**; serviço externo de varredura é **proibido** para plano e extrato (SEG-251, SEG-222). Falha fechada.
- **ArmazenamentoPort**: URL assinada de envio e de leitura (60 s), mover, conferir hash, apagar conteúdo.

## Consequências

- Trocar fornecedor não toca domínio nem aplicação; há teste que substitui o provedor de IA por um *mock* sem mudar o contrato (TI-ESQ).
- Custo de manter interfaces e *mocks*; compensado pela testabilidade e pelo plano de corte sem IA.
- As escolhas reais (contrato do Claude, provedor de pagamento, motor antimalware) viram ADRs próprios quando decididas.
