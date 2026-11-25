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
- [x] ⭐ T-007 · Escrever o PRD (`docs/01-prd.md`) a partir do briefing, com RF/RN e critérios de aceite · analista-produto · Dep.: T-006 · Pronto quando: lista de verificação do prd-builder completa
- [x] ⭐ T-008 · 🛑 **DECISÃO** · Aprovar o PRD · usuário · Dep.: T-007
- [x] ⭐ T-007b · PRD v0.2: plano Meta → Etapa → Linha, importação de planilha/PDF/imagem com minuta e OK do líder (linha de base), ajustes versionados, execução mensal, práticas das ISO 21500/21502/21512 em versão enxuta · analista-produto · Dep.: T-008
- [x] ⭐ T-008b · 🛑 **DECISÃO** · Aprovar o PRD v0.2 · usuário · Dep.: T-007b
- [x] ⭐ T-020 · Revisar `docs/03-ux.md`, `design/`, `docs/04-workflows.md` e `docs/06-seguranca.md` contra o PRD v0.2 (telas de importação, conferência, linha de base, saúde do projeto; selo ISO; segurança dos documentos importados) · designer, analista-produto, seguranca · Dep.: T-008b
- [x] ⭐ T-021 · 🛑 **DECISÃO** · Aprovar o protótipo atualizado (substitui a avaliação da T-017 sobre as telas novas) · usuário · Dep.: T-020
- [~] ⭐ T-022 · Emenda do PRD v0.2.1: importação de extrato (T-012), escala TRL/MRL (T-019), contradição D25, divergências do seguranca e dos fluxos, quadro de perguntas pendentes ao dono · analista-produto · Dep.: T-021
- [ ] ⭐ T-022b · 🛑 **DECISÃO** · Aprovar o PRD v0.2.1 e responder às perguntas de maior impacto · usuário · Dep.: T-022
- [ ] ⭐ T-022c · Alinhar `03-ux`, `04-workflows`, `06-seguranca` e `design/` à emenda (extrato, TRL/MRL, D25, listas de questões) · designer, analista-produto, seguranca · Dep.: T-022b
- [x] ⭐ T-009 · Requisitos de segurança e LGPD (`docs/06-seguranca.md`): inventário de dados, matriz de permissões (líder concede acesso), RLS, auditoria, segurança da IA · seguranca · Dep.: T-008
- [x] ⭐ T-010 · 🛑 **DECISÃO** · Stack: confirmar Next.js + Supabase + hospedagem (proposta: Vercel) · usuário · Dep.: T-008
- [x] ⭐ T-011 · 🛑 **DECISÃO** · Como as regras do edital entram: (a) o líder cadastra; (b) a IA lê o PDF e o líder confere; (c) as duas formas · usuário · Dep.: T-008
- [x] ⭐ T-012 · 🛑 **DECISÃO** · Como os dados da conta entram na 1ª versão: (a) lançamento manual; (b) importação de extrato (OFX/CSV); (c) integração bancária · usuário · Dep.: T-008
- [ ] ⭐ T-013 · Escrever a SPEC (`docs/02-spec.md`) + ADRs: arquitetura, modelo de dados, APIs, IA · desenvolvedor · Dep.: T-009, T-010, T-011, T-012
- [ ] ⭐ T-014 · 🛑 **DECISÃO** · Aprovar a SPEC · usuário · Dep.: T-013
- [x] ⭐ T-015 · Fluxos do produto (`docs/04-workflows.md`, modo processo): plano de trabalho, despesa com checagem, conta e rendimentos, TRL/MRL, entrada e saída de membros · analista-produto · Dep.: T-008
- [x] ⭐ T-016 · Guia de UX (`docs/03-ux.md`): tokens azul-marinho/verde, navegação, mapa de telas, dashboards · designer · Dep.: T-008
- [x] ⭐ T-017 · 🛑 **DECISÃO** · Aprovar identidade visual e telas principais (protótipo) · usuário · Dep.: T-016
- [ ] ⭐ T-018 · Criar as 7 skills de domínio (regras-de-edital, checagem-pre-compra, execucao-financeira-pdi, trl-mrl, iso-21500, busca-cientifica, assinatura-por-projeto), com `evals/` · analista-produto (via agent-skill-builder) · Dep.: T-008
- [x] T-019 · 🛑 **DECISÃO** · Escala de referência TRL/MRL (proposta: TRL ISO 16290 / NASA; MRL DoD) · usuário · Dep.: T-018

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
- [ ] ⭐ T-403 · Importação de extrato (OFX/CSV) com conciliação · desenvolvedor · Dep.: T-402 · *T-012 = (b): entra na 1ª versão*
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
| 24/11/2026 | T-007 | PRD v0.1 escrito pelo analista-produto e **revisado pelo orquestrador**: 59 RFs (44 Must, 11 Should, 4 Could), 24 RNs, 14 RNFs, 21 suposições [SUPOSIÇÃO], 21 questões em aberto. Caso real do briefing = RF-062 (4 critérios de aceite). Nenhuma decisão pendente (T-011, T-012, T-019, T-701, T-801, T-802) foi tomada; nenhuma funcionalidade da 2ª versão virou Must. Questão Q-21 resolvida: status do briefing corrigido para aprovado. | `docs/01-prd.md` (736 linhas) |
| 24/11/2026 | T-008 | **PRD aprovado pelo dono** (opção a: como está; as 21 suposições valem até serem corrigidas). | mensagem do dono |
| 24/11/2026 | T-009, T-015, T-016 | Iniciadas em paralelo (só dependem do PRD): seguranca → `docs/06-seguranca.md`; analista-produto → `docs/04-workflows.md`; designer → `docs/03-ux.md`. | — |
| 24/11/2026 | T-010 | Dono escolheu **Next.js + Supabase hospedado na Vercel** (opção a). Pergunta sobre exigência de dados no Brasil ficou sem resposta: pendente, vale como suposição "sem exigência" até o dono dizer o contrário (afeta a região do Supabase, a definir na T-101). | mensagem do dono |
| 24/11/2026 | T-015 | `docs/04-workflows.md` escrito pelo analista-produto e revisado pelo orquestrador: 7 fluxos da 1ª versão, 10 diagramas stateDiagram-v2, catálogo de eventos de auditoria, 17 divergências/ambiguidades do PRD (D1 a D17, seção 10) para decidir com o dono. Nada da 2ª versão foi modelado; nenhuma decisão aberta foi tomada. **Ressalva:** os diagramas Mermaid só tiveram a abertura/fechamento dos blocos conferida; a renderização foi bloqueada pelo classificador de permissões e **não foi validada**. | `docs/04-workflows.md` (948 linhas) |
| 24/11/2026 | T-009 | `docs/06-seguranca.md` v0.1 escrito pelo seguranca e revisado pelo orquestrador: 108 requisitos SEG-NNN (todos com origem e verificação), inventário LGPD (26 itens), matriz de permissões, STRIDE (12 módulos), incidentes. Papéis LGPD, bases legais e prazos legais (6 meses Marco Civil; 3 dias úteis ANPD) estão **marcados como proposta, citados de memória, a confirmar com revisão jurídica (T-901)**. 10 questões novas para o dono (QS-01 a QS-10; ex.: quem é o controlador dos dados, quem é o encarregado/DPO, suporte da Gestprojet pode acessar dados sem autorização do líder). Itens da lista pendentes: conferir auditoria com T-015 (agora existe) e agentes de IA com T-018. | `docs/06-seguranca.md` (498 linhas) |
| 24/11/2026 | T-016 | `docs/03-ux.md` (500 linhas) e protótipo estático `design/index.html` (1 arquivo, sem referência externa, tema claro/escuro, 360 px a desktop) escritos pelo designer e revisados pelo orquestrador. Contraste WCAG: **84 verificações, 0 falhas**, repetidas pelo orquestrador com `design/verificar-contraste.py`. Telas: painel, Vou comprar (formulário + permitido/bloqueado/pendente, com o RF-062), financeiro, TRL/MRL, estados. Dados fictícios; logotipo provisório; escala TRL/MRL de exemplo (depende de T-019). Não testado com líder em campo. | `docs/03-ux.md`, `design/` |
| 24/11/2026 | T-017 | **Parada obrigatória 🛑:** aguardando o dono avaliar o protótipo (identidade visual e telas). | — |
| 25/11/2026 | T-011 | Dono decidiu: o plano de trabalho aprovado entra por **planilha, PDF (digital ou escaneado) ou imagem**; a plataforma gera uma **minuta**, o líder confere (com o trecho de origem ao lado) e dá o **OK**, que trava a linha de base; cadastro manual também existe; valem para todos os financiadores, com classificação da despesa configurável. Modelo de acompanhamento: **Meta → Etapa → Linha** (classificação, objeto previsto, valor aprovado) × execução por período, conforme planilha de TED enviada. | mensagens do dono |
| 25/11/2026 | normas | Dono enviou ABNT NBR ISO 21500:2021, 21502:2021 e 21512:2026 (consulta privada, fora do repositório). Lidas por completo as duas primeiras e os capítulos 4-5 da 21512. **Correção:** a lista de grupos de processos citada antes era da 21500:2012 (cancelada). Redação do produto: "alinhado às práticas das ISO…", nunca "em conformidade". Fórmulas dos índices de custo e prazo da 21512 ainda a conferir. | resumos dos agentes; arquivos não versionados |
| 25/11/2026 | escopo | Dono aprovou as **duas camadas**: 1ª versão enxuta (plano, importação, linha de base, ajustes, execução mensal, marcos e 0/100, riscos/questões enxutos, saúde do projeto); depois, índices de custo e prazo e demais práticas. T-304 (chave de IA) passa a ser necessária na 1ª versão. | mensagem do dono |
| 25/11/2026 | T-007b | Iniciada: PRD v0.2 delegado ao analista-produto. T-012 (dados da conta), T-019 (escala TRL/MRL) e demais decisões seguem abertas. | — |
| 25/11/2026 | T-007b | PRD v0.2 escrito pelo analista-produto e **revisado pelo orquestrador** (1.086 linhas): 84 RFs ativos (26 novos, RF-120 a RF-145; RF-023 removido e substituído por RF-138), 38 RNs, 21 RNFs, 34 questões (Q-22 a Q-34 novas), riscos R-09 a R-14. Conferido por contagem: 57 Must; nenhuma afirmação de "conformidade" com normas; ISO 21500:2012 só citada como cancelada; RF-062 (caso real) mantido. Ressalva do analista: leitura de PDF/imagem é a parte mais cara e pode atrasar o piloto (R-10); há caminho mínimo sem IA (planilha ou cadastro manual). Fórmulas dos índices ainda a conferir. | `docs/01-prd.md` |
| 25/11/2026 | T-008b | **Parada obrigatória 🛑:** aguardando o dono aprovar o PRD v0.2. | — |
| 25/11/2026 | T-008b | **PRD v0.2 aprovado pelo dono** ("como está"): PDF e imagem permanecem na 1ª versão, como o dono pediu; o risco R-10 (custo/atraso da leitura por IA) segue registrado e o caminho mínimo sem IA fica como plano de corte. As suposições `[SUPOSIÇÃO]` valem até serem corrigidas. | mensagem do dono |
| 25/11/2026 | T-020 | Iniciada em paralelo: designer → `docs/03-ux.md` e `design/`; analista-produto → `docs/04-workflows.md`; seguranca → `docs/06-seguranca.md`. | — |
| 25/11/2026 | T-012 | Dono escolheu a opção **b: importação do extrato bancário (OFX/CSV)** para os dados da conta. Efeitos: RF-052 (hoje Could no PRD v0.2) passa a ser da 1ª versão; a conciliação do checklist de saúde deixa de ser "não verificável"; T-403 entra no caminho mínimo. Pendente: emenda ao PRD (v0.2.1) e requisitos de segurança do extrato (dados bancários). Lançamento manual continua como alternativa (a confirmar no PRD). | mensagem do dono |
| 25/11/2026 | T-019 | Dono escolheu **TRL de 1 a 9 e MRL de 1 a 10** (opção a). Referências: ISO 16290 para o TRL e a escala de 10 níveis do DoD para o MRL; os textos oficiais dos critérios **não foram conferidos**: ficam "a validar" até o dono enviar o documento de critérios ou o analista obtê-los de fonte aberta. Escala configurável por financiador fica para depois. | mensagem do dono |
| 25/11/2026 | T-020 (segurança) | `docs/06-seguranca.md` v0.2 escrito pelo seguranca e revisado pelo orquestrador (732 linhas): 144 SEG (36 novos, SEG-206 a SEG-241), inventário D-27 a D-37, matriz com 38 linhas, STRIDE de 5 módulos novos. **Leitura de PDF/imagem por IA fica DESLIGADA até haver contrato de IA (Q-24) e RIPD**: é um bloqueio real do piloto nesse caminho; planilha e cadastro manual não dependem disso. Questões novas para o dono: QS-11 a QS-18. Pendentes: conferir eventos de auditoria com `04-workflows` (após o analista terminar) e agentes de IA com `05-agentes` (T-018). Divergências do PRD (DP-01 a DP-09) vão para a emenda v0.2.1. | `docs/06-seguranca.md` |
| 25/11/2026 | T-020 (fluxos) | `docs/04-workflows.md` v0.2 escrito pelo analista-produto e revisado pelo orquestrador (1.841 linhas): 17 seções, 22 diagramas (blocos abertos e fechados; **renderização não validada**), fluxos novos 8 a 12 (importação e linha de base v1, ajuste versionado, execução mensal, gestão enxuta, saúde do projeto) e fluxos 1 a 4 atualizados; referências a RF/RN/Q conferidas contra o PRD (nenhuma inexistente). Divergências D18 a D25 novas; **D25 é uma contradição do PRD**: RN-029 (plano sem OK = pendente) × RN-006/RF-062 (item vedado = bloqueado); o analista adotou o bloqueio com precedência; corrigir na emenda v0.2.1. | `docs/04-workflows.md` |
| 25/11/2026 | T-020 (UX) | `docs/03-ux.md` v0.2 (646 linhas) e protótipo `design/index.html` (2.929 linhas, 31 rotas, sem referência externa) escritos pelo designer e revisados pelo orquestrador. Contraste repetido pelo orquestrador: **110 verificações, 0 falhas**. Telas novas: planejamento, importar (4 estados), conferir a minuta com a origem ao lado, execução mensal, saúde do projeto, registros de gestão; "Vou comprar" contra a linha (5 variantes, RF-062 mantido); selo ISO substituído por nota "baseado nas práticas". Ressalvas: largura 360 px simulada (confirmar no aparelho); sem teste com leitor de tela nem com líder; o guia ainda lista T-012 e T-019 como abertas (decididas depois), a corrigir na emenda. **T-020 concluída (UX, fluxos e segurança).** | `docs/03-ux.md`, `design/` |
| 25/11/2026 | T-021 | **Parada obrigatória 🛑:** aguardando o dono avaliar o protótipo atualizado. | — |
| 25/11/2026 | T-017, T-021 | **Identidade visual e protótipo atualizado aprovados pelo dono** ("Aprovado"). Nota: a aprovação refere-se ao protótipo; a pergunta específica sobre D25 (item vedado × plano sem OK) não foi respondida e segue como questão. | mensagem do dono |
| 25/11/2026 | T-022 | Iniciada: emenda v0.2.1 do PRD delegada ao analista-produto. | — |
