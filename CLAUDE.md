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
