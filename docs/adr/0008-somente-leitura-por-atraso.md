# ADR-0008: Somente leitura por atraso imposto no banco

Status: proposto · Data: 2026-11-25 · SPEC: seção 4.9 · RF-104, RN-018, SEG-027, SEG-146, SEG-264

## Contexto

O dono decidiu: teste de 30 dias; em atraso o projeto fica **somente leitura**; **nunca** apagar dados. O efeito deve ser configuração (RN-018), valer para API, jobs e importações, e não pode depender de a tela esconder botões. Revogar membro, pagar, exportar e atender pedidos de titular continuam permitidos.

## Opções

1. Verificar a situação só na aplicação (qualquer rota esquecida ou job grava em projeto em atraso).
2. Políticas RLS com a condição "projeto gravável".
3. **Políticas, funções e um trigger genérico em toda tabela com `projeto_id`** (escolhida): o trigger vale também para `service_role` e `app_worker`.

## Decisão

- `private.situacao_efetiva(assinatura)` usa o relógio do **banco**: com `em_teste` e `now() > fim_teste` devolve `teste_vencido` (ou `aguardando_pagamento` se houver contratação), mesmo que o job ainda não tenha rodado.
- A tabela `assinatura_efeito` (configuração) diz, por situação, se a escrita é permitida. `private.projeto_gravavel(projeto)` = projeto `ativo` e escrita permitida.
- Usada em `WITH CHECK` das políticas, no início de toda função `fn_*` e no trigger `BEFORE INSERT OR UPDATE OR DELETE` de toda tabela com `projeto_id`, **exceto** `assinatura*`, `cobranca`, `pagamento`, `webhook_evento`, `pagador`, `pedido_titular`, `exportacao`, `alerta`, `idempotencia`, `auditoria.*` e `projeto_membro` (só a transição para `revogado`). Teste de CI falha se uma tabela com `projeto_id` estiver fora da regra.
- Leitura, exportação e download continuam; a auditoria continua gravando; a escrita recusada gera `assinatura.escrita_recusada_por_atraso` (contagem agregada), em transação própria.
- Nenhuma rotina de descarte nasce da situação da assinatura; retenção e eliminação seguem política própria (Q-12, SEG-084).
- Voltar do atraso só por evento verificado do provedor ou ação autorizada, sem perda de dados.

## Consequências

- Garantia independente da aplicação; custo de uma consulta rápida por escrita (índice por projeto).
- O estado `teste_vencido` não existe no PRD (RF-104): proposto aqui, aguarda o dono (SPEC 11.1, V3). O padrão é somente leitura quando não há contratação; configurável.
- Uma tabela nova com `projeto_id` precisa entrar na regra ou na lista de exceções, senão o CI falha.
