---
name: prd-builder
description: "Constrói e mantém o documento mestre de requisitos do produto (PRD) da Gestprojet, a plataforma de gestão de projetos de pesquisa. Use quando o pedido envolver funcionalidades, público-alvo, personas, regras de negócio, modelo de assinatura por projeto, escopo de MVP, priorização ou critérios de aceite. É a primeira etapa do fluxo; as skills spec-builder, uxdesign-builder, workflow-builder, agent-skill-builder e security-builder partem do PRD."
---

# prd-builder: requisitos do produto da Gestprojet

Saída: `docs/01-prd.md`. Esse arquivo é a fonte de verdade do produto. As outras skills leem o PRD e não podem contradizê-lo; quando uma delas precisar mudar um requisito, a mudança volta para cá primeiro.

## Contexto fixo do produto

- A Gestprojet gerencia projetos de pesquisa, desenvolvimento e inovação (PD&I) do início ao encerramento: proposta, execução científica, execução financeira, prestação de contas e resultados.
- O diferencial não é "mais um gerenciador de tarefas". É integrar, em uma só plataforma, **gestão científica**, **maturidade tecnológica (TRL/MRL)**, **execução financeira** e **conformidade com a instituição e o financiador**, sem depender de uma instituição ou agência específica.
- Modelo comercial de partida: **assinatura por projeto**. Questione e documente as variações (planos, limites, quem paga, rubrica do projeto como fonte de pagamento, cobrança após o fim da vigência).
- Referências que o produto deve respeitar: família ISO 21500 (gestão de projetos), escalas TRL/MRL, LGPD, regras de editais e termos de outorga das agências (FAPs, CNPq, FINEP, EMBRAPII, empresas, cooperação internacional).

## Processo

1. **Leia o que já existe.** Se `docs/01-prd.md` existir, atualize-o; não recomece. Registre cada mudança na seção "Histórico de decisões".
2. **Entreviste antes de escrever.** Faça no máximo 5 perguntas por rodada, só sobre o que muda o documento. Se faltar uma resposta, escreva uma suposição explícita marcada `[SUPOSIÇÃO]` e siga.
   Perguntas prioritárias:
   - Quem compra e quem usa? (coordenador, pesquisador, bolsista, gestor da fundação de apoio, NIT, financiador, auditor)
   - Quais 3 dores mais custam tempo ou dinheiro hoje? (ex.: prestação de contas, remanejamento de rubricas, relatórios técnicos, controle de bolsistas)
   - Quais agências e tipos de edital entram no MVP?
   - Como funciona a assinatura: preço por projeto, por faixa de orçamento, por número de usuários?
   - O que fica fora do MVP?
3. **Escreva o PRD** com o modelo abaixo.
4. **Revise contra a lista de verificação** do fim deste arquivo antes de entregar.

## Modelo de `docs/01-prd.md`

```markdown
# Gestprojet: PRD
Versão: x.y · Data: AAAA-MM-DD · Status: rascunho | em revisão | aprovado

## 1. Visão e problema
Uma frase de visão. O problema em termos do usuário, com evidência (relato, número, norma).

## 2. Objetivos e métricas de sucesso
| Objetivo | Métrica | Meta | Prazo |

## 3. Público-alvo e personas
Para cada persona: papel, contexto, tarefas principais, dores, o que ela pode ver e fazer.

## 4. Escopo
### 4.1 MVP  ### 4.2 Próximas versões  ### 4.3 Fora do escopo

## 5. Requisitos funcionais
Identificador RF-NNN, agrupados por módulo:
- Projetos e portfólio · Plano de trabalho e metas · Equipe e bolsistas
- Execução financeira e rubricas · Prestação de contas · Documentos e evidências
- Maturidade TRL/MRL · Editais e conformidade · Relatórios · Agentes de IA
- Assinatura e cobrança · Administração e permissões
Cada RF: descrição, persona, prioridade (MoSCoW), critérios de aceite (Dado/Quando/Então).

## 6. Regras de negócio
RN-NNN. Ex.: remanejamento entre rubricas acima de X% exige aprovação do financiador;
rendimentos de aplicação financeira só são usados com autorização formal registrada.

## 7. Requisitos não funcionais
Desempenho, disponibilidade, acessibilidade (WCAG 2.2 AA), idioma, retenção de documentos,
LGPD e segurança (resumo; detalhes em docs/06-seguranca.md).

## 8. Modelo de assinatura
Planos, o que cada um libera, ciclo de cobrança, o que acontece com os dados ao fim da assinatura.

## 9. Riscos e premissas
## 10. Questões em aberto
## 11. Histórico de decisões
| Data | Decisão | Motivo |
```

## Regras de escrita

- Requisitos testáveis: evite "rápido", "fácil", "intuitivo" sem número ou critério.
- Um requisito por item, com identificador estável. Não renumere; marque os removidos como `[REMOVIDO]`.
- Segurança desde o início: todo RF que toca dado pessoal, financeiro ou sigiloso tem nota de quem pode acessar.
- Não invente regras de agências. Se uma regra depende de edital específico, escreva "configurável por edital" e registre a dúvida em Questões em aberto.

## Lista de verificação antes de entregar

- [ ] Cada persona tem pelo menos um RF.
- [ ] Cada RF Must tem critério de aceite.
- [ ] O modelo de assinatura está descrito, mesmo que com suposições.
- [ ] Escopo do MVP cabe numa frase.
- [ ] Questões em aberto listadas, com responsável quando houver.
- [ ] Próximo passo indicado: rodar `spec-builder`.
