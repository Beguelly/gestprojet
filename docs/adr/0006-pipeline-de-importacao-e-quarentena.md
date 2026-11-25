# ADR-0006: Pipeline de importação, quarentena e leitor isolado

Status: proposto · Data: 2026-11-25 · SPEC: seção 7 · RF-123 a RF-125, RNF-12, RNF-15, RNF-20, SEG-206 a SEG-217

## Contexto

Todo arquivo enviado é entrada não confiável (planilha com macro, PDF com script, imagem com GPS, extrato com fórmula ou XXE). O `06` exige tipo real, limites, quarentena, varredura antes de guardar, hash do original, leitor sem rede e sem credenciais, e falha fechada. O corpo de upload não deve passar pelas funções da hospedagem (limites a conferir).

## Opções

1. Tudo em funções da Vercel, com antivírus de terceiro por API: arquivo sai da plataforma (viola SEG-251 e SEG-222) e o leitor não teria isolamento.
2. Funções de borda do Supabase: sem memória e tempo para antimalware e leitura de PDF (a conferir).
3. **Serviço de arquivos em contêiner próprio** com antimalware auto-hospedado, worker e leitor em processo filho sem rede e sem credenciais (escolhida).

## Decisão

Fluxo: navegador envia direto ao bucket `quarentena` por URL assinada de envio → API registra → worker valida tipo **real** e limites sobre os bytes → varredura (indisponível ou erro = continua em quarentena; detecção = recusa e alerta) → **só então** calcula o SHA-256 sobre os bytes, cifra e guarda o original imutável → leitor isolado produz **minuta** (plano) ou **staging** (extrato), sem efeito → conferência e confirmação do líder. Planilha, OFX e CSV por leitura determinística (valor em cache, sem recalcular, sem macro, sem vínculo, números por texto a centavos); PDF e imagem só com a flag de IA ligada. O worker usa o papel `app_worker`, que só escreve em staging, minuta, importação, derivados e fila; o leitor filho não tem rede nem credencial alguma. Acesso a arquivo só por URL assinada de 60 s emitida pela API, um evento por emissão.

## Consequências

- Um terceiro componente a operar e pagar (T-115); sem ele nada é guardado (falha fechada). Decisão do dono sobre custo e operação.
- O isolamento real do leitor é o ponto técnico mais incerto (spike S-02); a porta `LeitorPort` permite trocar a implementação (processo em sandbox, microVM efêmera).
- A falha do serviço de arquivos não derruba o produto: uploads e leituras ficam em fila.
- Limites de tipo e tamanho valem no bucket, na função de início e no worker (nunca só na tela).
