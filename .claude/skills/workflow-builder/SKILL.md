---
name: workflow-builder
description: "Modela os fluxos de trabalho da GestProjet (ciclo de vida do projeto, tarefas, aprovações, remanejamentos, prestação de contas, automações e notificações) e também gera o plano de implementação em lista de tarefas para o time de desenvolvimento. Use para desenhar processos e máquinas de estado, definir quem aprova o quê, criar automações e alertas, ou quebrar o PRD/spec em backlog e sprints."
---

# workflow-builder: fluxos e plano de trabalho da GestProjet

Entradas: `docs/01-prd.md`, `docs/02-spec.md`, e `docs/03-ux.md` quando houver.
Saídas: `docs/04-workflows.md` (processos do produto) e `docs/backlog.md` (tarefas de desenvolvimento).

Esta skill tem dois modos. Pergunte qual, se o pedido não deixar claro:
- **Modo processo:** como o trabalho acontece dentro da plataforma.
- **Modo backlog:** como o time vai construir a plataforma.

## Modo processo

Para cada fluxo, descreva:
- Gatilho, atores (papéis do PRD), estados e transições (diagrama `stateDiagram-v2` em Mermaid).
- Quem aprova, com que prazo, e o que acontece se o prazo vencer.
- Regras de negócio aplicadas (RN-NNN do PRD).
- Evidências exigidas em cada passo.
- Eventos de auditoria gerados (alinhar com `security-builder`).
- Notificações (quem recebe, por qual canal, com que antecedência).

Fluxos mínimos da GestProjet:
1. **Ciclo de vida do projeto:** proposta → aprovado → contratado (termo de outorga) → em execução → prorrogado/suspenso → em prestação de contas final → encerrado/arquivado.
2. **Plano de trabalho:** metas → atividades → tarefas, com responsável, prazo e entrega.
3. **Despesa:** solicitação → verificação de saldo na rubrica → aprovação → pagamento → comprovante → conciliação com extrato.
4. **Remanejamento entre rubricas:** pedido justificado → análise → aprovação interna → aprovação do financiador quando a regra exigir.
5. **Rendimentos financeiros:** apuração → proposta de aplicação → autorização formal → uso → registro na prestação de contas. Nada é aplicado sem autorização registrada.
6. **Prestação de contas parcial e final:** checklist do edital → coleta de comprovantes e relatórios → revisão → envio → diligências → aprovação.
7. **Avaliação TRL/MRL:** autoavaliação com evidências → revisão por avaliador → registro do nível e da data.
8. **Entrada e saída de membros/bolsistas:** convite, termo de compromisso, acesso, desligamento com revogação imediata de acesso.

Princípio: **a IA sugere, a pessoa decide.** Nenhuma transição que movimente dinheiro, envie documento externo ou aprove algo é feita só por agente.

## Modo backlog

1. Agrupe por épico (um por módulo do PRD) e quebre em histórias de no máximo 2–3 dias.
2. Cada tarefa: ID, título, RF/RN de origem, critério de pronto, dependências, estimativa (P/M/G), tipo (feature, infra, segurança, dados, UX).
3. Ordem: fundação (autenticação, tenant, permissões, auditoria) → núcleo de projetos → financeiro → prestação de contas → documentos → TRL/MRL → IA → cobrança.
4. Tarefas de segurança entram junto da feature, não num bloco no fim.
5. Marque o caminho mínimo do MVP.

Formato de `docs/backlog.md`:

```markdown
## Épico E01 — Fundação
- [ ] T-001 · Autenticação com MFA · RF-090 · Pronto quando: … · Dep.: — · M · segurança
```

## Lista de verificação

- [ ] Todo fluxo tem estados finais e caminho de exceção (recusa, prazo vencido, cancelamento).
- [ ] Toda aprovação tem responsável e prazo.
- [ ] Fluxos financeiros geram auditoria e exigem comprovante.
- [ ] Backlog cobre todos os RF Must.
- [ ] Próximo passo indicado: `agent-skill-builder`.
