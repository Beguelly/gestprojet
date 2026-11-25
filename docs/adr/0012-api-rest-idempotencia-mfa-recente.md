# ADR-0012: API REST, idempotência e MFA recente

Status: proposto · Data: 2026-11-25 · SPEC: seção 5 · SEG-004, SEG-005, SEG-007, SEG-011, SEG-141, SEG-200

## Contexto

A API precisa servir a interface, receber webhooks, ser testável por contrato, repetir pedidos sem duplicar dinheiro, resistir a força bruta e exigir MFA recente nas ações críticas (OK da linha de base, ajuste vigente, importar extrato, revogar, exportar). O formato exato das claims de MFA do Supabase Auth é **a conferir**.

## Opções

1. Chamar o Auth e o banco direto do navegador (sem ponto para limite de taxa, auditoria de falhas e resposta uniforme).
2. Server Actions do Next.js (acopla ao framework; difícil para webhooks e para teste de contrato).
3. **REST/JSON em Route Handlers `/api/v1`, com rotas de autenticação próprias** (escolhida).

## Decisão

- REST/JSON versionado em `/api/v1`, esquemas compartilhados e OpenAPI gerado; erros `application/problem+json` com `code` estável; paginação por cursor; `ETag` e `If-Match` nas edições de minuta e de rascunho de ajuste.
- **Idempotência**: `Idempotency-Key` obrigatório nos `POST` que criam dinheiro ou documento, guardado por 72 h com o hash do corpo; mesma chave com corpo diferente é erro. Webhook idempotente por `unique(provedor, evento_id)`.
- **Autenticação** por rotas próprias que chamam o Auth no servidor: limite de taxa, resposta uniforme, eventos de falha. Sessão por cookie `HttpOnly`, `Secure`, `SameSite`; CSRF por `Origin` e cabeçalho ligado à sessão; JWT sempre verificado no servidor.
- **MFA**: `aal2` exigido em toda rota em que o usuário age como líder e verificado no banco; **passo-a-cima** por `POST /auth/step-up` (TOTP verificado), registrado em tabela própria (`private.mfa_stepup`) e válido por 15 minutos, **sem depender** do formato da claim de método ou de timestamps do token. Funções críticas conferem o passo-a-cima.
- Recurso de outro projeto responde como inexistente; a tentativa é auditada por função que só informa se o ID existe fora do escopo.
- Corpo de upload nunca passa pela API (URL assinada de envio).

## Consequências

- Um ponto único para limite de taxa, auditoria de acesso e uniformidade de respostas.
- Mais código de autenticação que usar o cliente direto; compensado por segurança e testabilidade.
- A tabela de passo-a-cima evita acoplamento a detalhes do provedor de identidade, mas exige limpeza periódica.
