# Gestprojet

Plataforma de gestão de projetos de pesquisa (PD&I): gestão científica, maturidade tecnológica (TRL/MRL), execução financeira e conformidade com instituição e financiador, em uma só plataforma.

## Fluxo de planejamento (skills em .claude/skills)

1. `prd-builder` → docs/01-prd.md (fonte de verdade do produto)
2. `spec-builder` → docs/02-spec.md + docs/adr/
3. `uxdesign-builder` → docs/03-ux.md
4. `workflow-builder` → docs/04-workflows.md + docs/backlog.md
5. `agent-skill-builder` → docs/05-agentes.md + novas skills
6. `security-builder` → docs/06-seguranca.md e revisões de código

A segurança entra desde a etapa 1: rode `security-builder` logo após o PRD para gerar requisitos, e de novo a cada etapa e mudança de código.

## Regras
- Documentação e interface em português do Brasil.
- Nenhuma etapa contradiz o PRD; mudança de requisito volta primeiro ao PRD.
- IA sugere, pessoa decide: nenhuma ação com efeito financeiro ou externo sem confirmação humana.

## Visão inicial (figura de referência do produto)

- **Nome e slogan:** Gestprojet, "Plataforma de Gestão de Projetos de Pesquisa". Mensagem: do planejamento à prestação de contas, com TRL, MRL, ISO 21500 e evidências técnicas integradas.
- **Funcionalidades apresentadas:**
  1. Gestão do projeto de pesquisa
  2. Aplicação automática de TRL e MRL
  3. Conformidade com a ISO 21500
  4. Prestação de contas conforme o edital
  5. Controle da conta bancária e rendimentos
  6. Distribuição dos rendimentos para atividades do projeto (com autorização)
  7. Relato fotográfico e técnico
  8. Relatórios por etapa
  9. Busca de informações científicas (atualizadas)
- **Público:** pesquisadores de todas as instituições.
- **Modelo de contratação:** valor por mês de projeto.
- **Segurança e governança:** conformidade, rastreabilidade e autorização de uso de recursos.
- **Identidade visual de partida:** azul-marinho como cor principal e verde como acento (logotipo com "G" estilizado e frasco de laboratório); menu lateral com Projetos, Planejamento, TRL/MRL, Financeiro, Prestação de contas, Relatórios; cards de TRL e MRL com nível atual, barra de progresso do projeto e selo ISO 21500. O `uxdesign-builder` parte disso e verifica contraste.

## Time (subagentes em .claude/agents)

A sessão principal roda como `orquestrador` (`.claude/settings.json`). Ele coordena e delega; nunca escreve código.

| Agente | Papel | Escreve em |
|---|---|---|
| orquestrador | Coordena o TASKS.md, mantém o diário, commit/push | TASKS.md, CLAUDE.md |
| analista-produto | PRD, regras, fluxos, domínio, skills de domínio | docs/, .claude/skills/ |
| desenvolvedor | SPEC, ADRs, banco, backend, frontend | código, docs/02-spec.md, docs/adr/ |
| designer | UX, identidade, telas, componentes visuais | interface, docs/03-ux.md |
| testador | Testes automatizados e relatório de falhas | pastas de teste |
| seguranca | Requisitos LGPD/segurança e revisões | docs/06-seguranca.md, docs/revisoes/ |

Toda entrega de código passa por testador e seguranca antes de ser concluída. Tarefas 🛑/🔑 do TASKS.md exigem parar e perguntar ao dono do projeto.
