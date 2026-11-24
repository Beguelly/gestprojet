# Gestprojet: TASKS.md (diário de bordo)

Plano de execução da **1ª versão (execução do projeto)**, conforme `docs/00-briefing.md`.
Escopo: gestão do projeto + ISO 21500 · regras do edital · conta e rendimentos · checagem antes da compra · TRL/MRL · busca científica · cobrança de R$ 50/mês por projeto.
Fora do escopo (2ª versão): prestação de contas, relato fotográfico, relatórios por etapa, distribuição de rendimentos.

**Meta de sucesso:** 1 projeto real usando e pagando.

## Como ler e atualizar

| Marca | Estado |
|---|---|
| `[ ]` | pendente |
| `[~]` | em andamento (só uma tarefa por agente ao mesmo tempo) |
| `[x]` | concluída, com evidência anotada no diário |

| Sinal | Significado | O que o agente faz |
|---|---|---|
| 🛑 **DECISÃO** | Depende de uma escolha do dono do projeto | **Para e pergunta.** Não supõe, não segue adiante. |
| 🔑 **CHAVE** | Depende de conta, credencial ou chave de acesso | **Para e pede** pelo formulário seguro. Nunca pede segredo no chat nem grava no código. |
| ⭐ | Caminho mínimo até o 1º projeto pagando | |

Formato: `ID · tarefa · responsável · Dep.: · Pronto quando:`
Toda tarefa de código só vira `[x]` depois de **testador** e **seguranca** aprovarem (tarefas `…-T` e `…-S` de cada épico).

---

## E00 · Preparação e planejamento

- [x] T-001 · Criar as 6 skills de planejamento e o CLAUDE.md · — · Pronto quando: skills listadas por `npx skills list` ✔
- [x] T-002 · Instalar skills externas (Supabase, Tavily, Impeccable, grill-me, improve-codebase-architecture) · — ✔
- [x] T-003 · Briefing do produto (entrevista) · — · `docs/00-briefing.md` ✔
- [x] ⭐ T-004 · 🛑 **DECISÃO + 🔑 CHAVE** · Criar o repositório no GitHub e informar o nome; conectar e enviar o histórico · orquestrador · Dep.: — · Pronto quando: `git push` feito. *Enquanto isso não acontece, todo o trabalho fica só no container temporário.*
- [x] ⭐ T-005 · 🛑 **DECISÃO** · Validar o time de agentes proposto (6 papéis) · usuário · Dep.: — · Pronto quando: aprovação registrada no diário
- [x] ⭐ T-006 · Criar `.claude/agents/*.md` (6 agentes) e `.claude/settings.json` com `"agent": "orquestrador"` · orquestrador → desenvolvedor · Dep.: T-005 · Pronto quando: agentes listados em `/agents`
- [~] ⭐ T-007 · Escrever o PRD (`docs/01-prd.md`) a partir do briefing, com RF/RN e critérios de aceite · analista-produto · Dep.: T-006 · Pronto quando: lista de verificação do prd-builder completa
- [ ] ⭐ T-008 · 🛑 **DECISÃO** · Aprovar o PRD · usuário · Dep.: T-007
- [ ] ⭐ T-009 · Requisitos de segurança e LGPD (`docs/06-seguranca.md`): inventário de dados, matriz de permissões (líder concede acesso), RLS, auditoria, segurança da IA · seguranca · Dep.: T-008
- [ ] ⭐ T-010 · 🛑 **DECISÃO** · Stack: confirmar Next.js + Supabase + hospedagem (proposta: Vercel) · usuário · Dep.: T-008
- [ ] ⭐ T-011 · 🛑 **DECISÃO** · Como as regras do edital entram: (a) o líder cadastra; (b) a IA lê o PDF e o líder confere; (c) as duas formas · usuário · Dep.: T-008
- [ ] ⭐ T-012 · 🛑 **DECISÃO** · Como os dados da conta entram na 1ª versão: (a) lançamento manual; (b) importação de extrato (OFX/CSV); (c) integração bancária · usuário · Dep.: T-008
- [ ] ⭐ T-013 · Escrever a SPEC (`docs/02-spec.md`) + ADRs: arquitetura, modelo de dados, APIs, IA · desenvolvedor · Dep.: T-009, T-010, T-011, T-012
- [ ] ⭐ T-014 · 🛑 **DECISÃO** · Aprovar a SPEC · usuário · Dep.: T-013
- [ ] ⭐ T-015 · Fluxos do produto (`docs/04-workflows.md`, modo processo): plano de trabalho, despesa com checagem, conta e rendimentos, TRL/MRL, entrada e saída de membros · analista-produto · Dep.: T-008
- [ ] ⭐ T-016 · Guia de UX (`docs/03-ux.md`): tokens azul-marinho/verde, navegação, mapa de telas, dashboards · designer · Dep.: T-008
- [ ] ⭐ T-017 · 🛑 **DECISÃO** · Aprovar identidade visual e telas principais (protótipo) · usuário · Dep.: T-016
- [ ] ⭐ T-018 · Criar as 7 skills de domínio (regras-de-edital, checagem-pre-compra, execucao-financeira-pdi, trl-mrl, iso-21500, busca-cientifica, assinatura-por-projeto), com `evals/` · analista-produto (via agent-skill-builder) · Dep.: T-008
- [ ] T-019 · 🛑 **DECISÃO** · Escala de referência TRL/MRL (proposta: TRL ISO 16290 / NASA; MRL DoD) · usuário · Dep.: T-018

## E01 · Fundação (infraestrutura, autenticação, permissões, auditoria)

- [ ] ⭐ T-101 · 🔑 **CHAVE** · Criar o projeto Supabase (dev) e conectar com as chaves no ambiente · desenvolvedor · Dep.: T-014 · Pronto quando: conexão testada, nenhuma chave no repositório
- [ ] ⭐ T-102 · Esqueleto Next.js + TypeScript + lint + CI (testes a cada push) · desenvolvedor · Dep.: T-014, T-004 · Pronto quando: CI verde no GitHub
- [ ] ⭐ T-103 · Migrações base: organizações, usuários, projetos, membros/papéis, com `tenant_id` e RLS · desenvolvedor · Dep.: T-101 · Pronto quando: migração aplica do zero
- [ ] ⭐ T-104 · Autenticação: cadastro, login, recuperação de senha; MFA para o líder · desenvolvedor · Dep.: T-103
- [ ] ⭐ T-105 · Convite de membro pelo líder, com papéis (registra informações / só visualiza) e revogação imediata · desenvolvedor · Dep.: T-104
- [ ] ⭐ T-106 · Trilha de auditoria imutável (append-only) e helper usado por todo o código · desenvolvedor · Dep.: T-103
- [ ] ⭐ T-107 · Layout base: menu lateral, tokens de design e componentes base · designer · Dep.: T-017, T-102
- [ ] ⭐ T-108 · 🔑 **CHAVE** · Ambiente de homologação publicado (hospedagem + Supabase) · desenvolvedor · Dep.: T-102, T-010
- [ ] ⭐ T-1T · Testes: login, convite, revogação, **isolamento entre projetos e organizações (RLS)** · testador · Dep.: T-105, T-106
- [ ] ⭐ T-1S · Revisão de segurança do épico · seguranca · Dep.: T-1T · Pronto quando: sem achado crítico ou alto em aberto

## E02 · Projeto e plano de trabalho (funcionalidades 1 e 3: ISO 21500)

- [ ] ⭐ T-201 · Cadastro do projeto: título, financiador, edital, termo de outorga, vigência, valor, líder · desenvolvedor · Dep.: T-1S
- [ ] ⭐ T-202 · Plano de trabalho: metas → atividades → tarefas, com responsável, prazo e entrega · desenvolvedor · Dep.: T-201
- [ ] ⭐ T-203 · Estrutura alinhada à ISO 21500 (fases, partes interessadas, riscos, marcos) e checklist de conformidade do projeto · desenvolvedor + analista-produto · Dep.: T-202
- [ ] ⭐ T-204 · Telas: lista de projetos, painel do projeto (progresso, prazos, pendências), plano de trabalho · designer · Dep.: T-202
- [ ] T-205 · Alertas de prazo (tarefas e vigência) dentro da plataforma · desenvolvedor · Dep.: T-202
- [ ] ⭐ T-2T · Testes dos critérios de aceite do épico · testador · Dep.: T-203, T-204
- [ ] ⭐ T-2S · Revisão de segurança do épico · seguranca · Dep.: T-2T

## E03 · Regras do edital (base da checagem)

- [ ] ⭐ T-301 · Modelo de regras: itens permitidos/vedados, rubricas, cotações mínimas por faixa de valor, limites, com fonte (cláusula/página) · desenvolvedor + analista-produto · Dep.: T-201, T-011
- [ ] ⭐ T-302 · Upload do edital e do termo de outorga (PDF) no armazenamento, com hash e acesso restrito ao projeto · desenvolvedor · Dep.: T-301
- [ ] ⭐ T-303 · Cadastro e revisão das regras pelo líder (tela) · designer + desenvolvedor · Dep.: T-301
- [ ] T-304 · 🔑 **CHAVE** · Chave da API de IA (proposta: Claude) para extração de regras · desenvolvedor · Dep.: T-011 = (b) ou (c)
- [ ] T-305 · Extração das regras do PDF por IA → **proposta** que o líder confere e aprova; o PDF é tratado como dado, nunca como instrução · desenvolvedor · Dep.: T-302, T-304
- [ ] ⭐ T-3T · Testes: regras com fonte; extração contra 3 editais reais de exemplo · testador · Dep.: T-303 (e T-305, se houver)
- [ ] ⭐ T-3S · Revisão de segurança (upload, acesso ao PDF, injeção de prompt) · seguranca · Dep.: T-3T
- [ ] T-306 · 🛑 **DECISÃO** · Fornecer 2–3 editais e termos de outorga reais (sem dados sigilosos) para os testes · usuário · Dep.: —

## E04 · Conta do projeto e rendimentos (funcionalidade 5)

- [ ] ⭐ T-401 · Rubricas e orçamento previsto por rubrica (custeio/capital), valores em centavos · desenvolvedor · Dep.: T-301
- [ ] ⭐ T-402 · Conta do projeto: lançamentos (débitos, créditos, rendimentos) conforme T-012 · desenvolvedor · Dep.: T-401, T-012
- [ ] T-403 · Importação de extrato (OFX/CSV) com conciliação · desenvolvedor · Dep.: T-402 · *só se T-012 = (b)*
- [ ] ⭐ T-404 · Painel financeiro: previsto × realizado × saldo por rubrica; rendimentos acumulados · designer + desenvolvedor · Dep.: T-402
- [ ] ⭐ T-405 · Anexar comprovantes (nota fiscal, cotações) a cada despesa · desenvolvedor · Dep.: T-402, T-302
- [ ] ⭐ T-4T · Testes: centavos e arredondamento, saldo, concorrência, permissões · testador · Dep.: T-404, T-405
- [ ] ⭐ T-4S · Revisão de segurança (dados bancários, auditoria de cada lançamento) · seguranca · Dep.: T-4T

## E05 · Checagem antes da compra (funcionalidade 10, o coração da 1ª versão)

- [ ] ⭐ T-501 · Motor de checagem: item permitido? rubrica? saldo? cotações exigidas anexadas? → **permitido / bloqueado / pendente**, com motivo e cláusula · desenvolvedor · Dep.: T-301, T-401, T-405
- [ ] ⭐ T-502 · Tela "Vou comprar": descrever o item, valor e rubrica, anexar cotações e ver o resultado · designer + desenvolvedor · Dep.: T-501
- [ ] ⭐ T-503 · Registro da compra vinculado à checagem (quem checou, resultado, quando), mais auditoria · desenvolvedor · Dep.: T-501, T-106
- [ ] T-504 · Sugestão por IA de rubrica e de enquadramento do item (sempre confirmada pelo líder) · desenvolvedor · Dep.: T-501, T-304
- [ ] ⭐ T-5T · Testes com o **caso real**: material vedado sem 3 cotações → deve bloquear. Mais rubrica errada, saldo insuficiente, cotação faltando · testador · Dep.: T-503
- [ ] ⭐ T-5S · Revisão de segurança do épico · seguranca · Dep.: T-5T

## E06 · TRL e MRL (funcionalidade 2)

- [ ] ⭐ T-601 · Modelo de avaliação TRL/MRL: nível, critérios, evidências, data, avaliador · desenvolvedor · Dep.: T-019, T-202
- [ ] ⭐ T-602 · Evidências: anexar documentos e resultados e ligá-los a critérios · desenvolvedor · Dep.: T-601, T-302
- [ ] ⭐ T-603 · Proposta automática de nível a partir das evidências, com as lacunas para o próximo nível; confirmação humana · desenvolvedor · Dep.: T-602 (T-304 se usar IA)
- [ ] ⭐ T-604 · Cards TRL/MRL no painel: nível atual × meta, histórico · designer · Dep.: T-603
- [ ] ⭐ T-6T · Testes com os evals da skill trl-mrl · testador · Dep.: T-604
- [ ] ⭐ T-6S · Revisão de segurança · seguranca · Dep.: T-6T

## E07 · Busca de informações científicas (funcionalidade 9)

- [ ] T-701 · 🛑 **DECISÃO + 🔑 CHAVE** · Fontes: só abertas (OpenAlex/Crossref/SciELO, sem chave) ou também Tavily (exige chave) · usuário · Dep.: T-014
- [ ] ⭐ T-702 · Busca por palavras-chave do projeto, deduplicada, com DOI e link · desenvolvedor · Dep.: T-701, T-201
- [ ] T-703 · Atualização periódica (novidades semanais) e aviso no painel · desenvolvedor · Dep.: T-702
- [ ] ⭐ T-704 · Tela de publicações (salvar, descartar, anotar relevância) · designer · Dep.: T-702
- [ ] ⭐ T-7T · Testes: nenhuma referência inventada, DOI válido · testador · Dep.: T-704
- [ ] ⭐ T-7S · Revisão de segurança · seguranca · Dep.: T-7T

## E08 · Assinatura por projeto (R$ 50/mês)

- [ ] ⭐ T-801 · 🛑 **DECISÃO** · Provedor de pagamento (proposta: Asaas ou Mercado Pago, com Pix, boleto e cartão para PF e PJ) e emissão de nota fiscal · usuário · Dep.: T-008
- [ ] ⭐ T-802 · 🛑 **DECISÃO** · Regras: período de teste? O que acontece em atraso (somente leitura?) e no encerramento do projeto (exportação dos dados)? · usuário · Dep.: T-008
- [ ] ⭐ T-803 · 🔑 **CHAVE** · Conta e chaves do provedor (sandbox, depois produção) · desenvolvedor · Dep.: T-801
- [ ] ⭐ T-804 · Assinatura por projeto: qualquer pagador, recibo para o patrocinador, webhooks de pagamento · desenvolvedor · Dep.: T-803, T-802
- [ ] ⭐ T-805 · Bloqueio e liberação conforme a situação do pagamento · desenvolvedor · Dep.: T-804
- [ ] ⭐ T-8T · Testes no sandbox: pago, atrasado, cancelado, webhook repetido · testador · Dep.: T-805
- [ ] ⭐ T-8S · Revisão de segurança (webhook assinado, nenhum dado de cartão guardado) · seguranca · Dep.: T-8T

## E09 · Lançamento e piloto (1 projeto pagando)

- [ ] ⭐ T-901 · 🛑 **DECISÃO** · Termos de uso e política de privacidade (LGPD): quem redige e valida (recomenda-se revisão jurídica) · usuário · Dep.: T-009
- [ ] ⭐ T-902 · 🛑 **DECISÃO + 🔑 CHAVE** · Domínio (ex.: gestprojet.com.br), e-mail de envio e ambiente de produção · usuário · Dep.: T-108
- [ ] ⭐ T-903 · Backup, monitoramento de erros e plano de incidentes ativos em produção · desenvolvedor + seguranca · Dep.: T-902
- [ ] ⭐ T-904 · Teste de ponta a ponta do fluxo completo com Playwright: cadastro → projeto → regras → compra checada → TRL → pagamento · testador · Dep.: todos os épicos ⭐
- [ ] ⭐ T-905 · Revisão de segurança final antes da produção · seguranca · Dep.: T-904
- [ ] ⭐ T-906 · 🛑 **DECISÃO** · Escolher o projeto piloto e o líder (ex.: o caso Embrapa) e autorizar a publicação · usuário · Dep.: T-905
- [ ] ⭐ T-907 · Acompanhar o piloto por 30 dias: registrar uso, dúvidas e erros no diário · orquestrador · Dep.: T-906 · Pronto quando: **1 projeto ativo e pago** = critério de sucesso atingido

---

## Resumo das paradas obrigatórias

| Tipo | Tarefas |
|---|---|
| 🛑 Decisão do dono | T-004, T-005, T-008, T-010, T-011, T-012, T-014, T-017, T-019, T-306, T-701, T-801, T-802, T-901, T-902, T-906 |
| 🔑 Chave ou conta | T-004 (GitHub), T-101 (Supabase), T-108 (hospedagem), T-304 (API de IA), T-701 (Tavily, opcional), T-803 (pagamento), T-902 (domínio e e-mail) |

## Diário de bordo

| Data | Tarefa | O que aconteceu | Evidência |
|---|---|---|---|
| 24/11/2026 | T-001 | 6 skills de planejamento criadas | commits 21d8033, 4937309 |
| 24/11/2026 | T-002 | 11 skills externas instaladas (frontend-design → impeccable) | commit ce9a286 |
| 24/11/2026 | T-003 | Briefing concluído e aprovado | `docs/00-briefing.md`, commit f3349aa |
| 24/11/2026 | — | TASKS.md criado; aguardando revisão do plano | commit f677296 |
| 24/11/2026 | T-004 | Repositório Beguelly/gestprojet criado e ligado como `origin`. **Envio recusado (403):** o app Claude do GitHub não tem acesso ao repositório. Aguardando o dono instalar o app ou reconectar o GitHub. | `git push` → 403 |
| 24/11/2026 | T-004 | Acesso liberado; 7 commits enviados para `Beguelly/gestprojet` (branch `main`). **Concluída.** | `git push` ok, `origin/main` = local |
| 24/11/2026 | T-005 | Dono escolheu **subagentes** (opção b). | mensagem do dono |
| 24/11/2026 | T-006 | 6 agentes criados em `.claude/agents/`, `settings.json` com `"agent": "orquestrador"`, time registrado no CLAUDE.md. Revisão: YAML válido, todas as skills citadas existem; skills de domínio serão adicionadas na T-018. Observação: o limite de pastas de cada agente é garantido pelas instruções, não por bloqueio técnico. | validação automática dos 6 arquivos |
| 24/11/2026 | T-007 | Iniciada: PRD delegado ao analista-produto. | — |
