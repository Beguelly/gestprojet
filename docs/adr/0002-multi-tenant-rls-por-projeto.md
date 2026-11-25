# ADR-0002: Multi-tenant e RLS por projeto, com acesso a dados mediado pelo servidor

Status: proposto; **confirmar ou emendar após o spike T-109** · Data: 2026-11-25 · SPEC: seções 4.1, 4.6 · SEG-020 a SEG-046

## Contexto

O projeto é a unidade de permissão e de assinatura (RN-022, RF-033); o tenant é a organização do cliente. O isolamento precisa valer no banco, e a revogação de acesso em até 60 segundos (RNF-05). O Supabase facilita expor o banco ao navegador por uma API de dados; isso deixaria a segurança só nas políticas.

## Opções de tenancy

1. Um banco ou esquema por cliente: isolamento forte, operação cara para o MVP.
2. **Tabelas compartilhadas com `tenant_id` e `projeto_id` em toda tabela de dado de projeto, RLS por projeto** (escolhida).
3. Só `tenant_id`, sem projeto: não atende RN-022.

## Opções de acesso ao banco

A. Navegador usa a API de dados com o JWT do usuário e RLS.
B. **Navegador só fala com a aplicação; o servidor acessa o banco com o papel `app_server` (sem `BYPASSRLS`, não dono), injetando em cada transação as claims do JWT já verificado** (escolhida).
C. `service_role` em tudo (rejeitada: ignora RLS, SEG-042).

## Decisão

- Opção 2 com chave estrangeira composta `(projeto_id, tenant_id) → projeto` e predicado único indexado nas políticas; organização pessoal criada no cadastro; pertencer à organização **não** dá acesso a projeto.
- Opção B: `anon` e `authenticated` **sem privilégio** nas tabelas; `ENABLE` e `FORCE RLS` em todas; permissão **lida do banco a cada requisição** (nada de papel em token, nada de `user_metadata`); operações críticas em funções `SECURITY DEFINER` em esquema privado, `search_path` vazio, verificação de `auth.uid()`, papel, MFA recente e projeto gravável, `EXECUTE` só para `app_server`; `app_worker` com privilégio mínimo.
- Predicado de política em conjunto calculado uma vez por consulta (`projeto_id in (select private.meus_projetos())`), `(select auth.uid())` embrulhado, índice nas colunas das políticas.

## Consequências

- O navegador não pode burlar a camada de aplicação; mesmo erro da aplicação esbarra em RLS, constraints e triggers.
- O servidor é código confiável: uma falha nele vale mais que em A. Mitigação: funções recalculam invariantes no banco, testes TR-RLS por matriz e revisão do `seguranca` a cada épico.
- Depende de pooler em modo de transação e de `set_config` local à transação funcionarem como previsto (spike T-109). **Plano B:** opção A com as mesmas políticas, expondo só as funções necessárias.
- Recursos que exigem acesso direto do navegador (tempo real) não são usados no MVP.
