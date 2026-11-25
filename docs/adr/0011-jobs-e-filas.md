# ADR-0011: Jobs assíncronos e filas

Status: proposto · Data: 2026-11-25 · SPEC: seções 4.4 (K) e 9.9 · RNF-16, RNF-22, SEG-214, SEG-244

## Contexto

Há trabalho que não cabe numa requisição: validação e varredura de arquivo, leitura de planilha e extrato, leitura por IA (até 3 minutos), limpeza de derivados, vencimento do teste, cobrança mensal, verificação de hashes, busca semanal, retenção. Precisa ser atômico com a transação de domínio, reexecutável com segurança e sem novo serviço caro. Os limites de tempo das funções da hospedagem são **a conferir**.

## Opções

1. Só funções da Vercel com Cron: limite de tempo e sem isolamento de leitor.
2. Funções de borda e agendador do Supabase: limites de memória e tempo a conferir; sem antimalware.
3. Fila externa gerenciada: outro serviço e outro custo para um volume pequeno.
4. **Fila em tabela Postgres (`job`) com `FOR UPDATE SKIP LOCKED`, worker no contêiner de arquivos, e Vercel Cron só para agendar** (escolhida).

## Decisão

- Tabela `job` (tipo, projeto, **payload só com identificadores**, estado, tentativas, agendamento, trava com prazo, código de erro, correlação). A criação do job acontece **na mesma transação** da operação que o origina.
- O worker (papel `app_worker`, privilégio mínimo) pega jobs com `SKIP LOCKED`, é idempotente por job, tenta novamente com recuo e envia a `morto` depois do máximo de tentativas, com alerta.
- A Vercel Cron chama rotas internas autenticadas por segredo apenas para **criar** jobs periódicos; a execução pesada é do worker.
- O trigger de atraso vale para o worker: o job de importação não grava em projeto somente leitura.
- Conteúdo de documento nunca vai no payload nem em log.

## Consequências

- Sem nova tecnologia; observável por SQL (idade do job mais antigo é métrica e alerta).
- Se o volume crescer muito, a fila migra para serviço dedicado sem mudar a interface dos jobs.
- Se o contêiner cair, o produto segue e os jobs ficam pendentes.
