---
name: uxdesign-builder
description: "Define a experiência do usuário da Gestprojet — identidade visual, tokens de design (cores, tipografia, espaçamento), navegação, mapa de telas, dashboards e componentes de interface. Use para criar ou revisar o guia de UX/UI, desenhar fluxos de tela, wireframes, painéis de acompanhamento de projeto, financeiro e TRL/MRL, ou avaliar acessibilidade."
---

# uxdesign-builder: experiência do usuário da Gestprojet

Entradas: `docs/01-prd.md` (personas e RFs) e, se houver, `docs/02-spec.md`.
Saídas: `docs/03-ux.md` e, quando pedido, protótipos em `design/` (HTML estático ou componentes).

## Princípios

1. **Clareza antes de densidade.** Os usuários são pesquisadores e gestores, não especialistas em software. Cada tela responde a uma pergunta ("quanto falta executar?", "o que vence esta semana?", "o que falta para a prestação de contas?").
2. **Situação do projeto sempre visível:** prazo de vigência, execução financeira, metas, pendências.
3. **Dinheiro sem ambiguidade:** valores alinhados à direita, moeda explícita, previsto × realizado × saldo lado a lado, nunca só cor para indicar estouro.
4. **Evidência a um clique:** todo número de relatório ou de avaliação TRL/MRL leva ao documento que o sustenta.
5. **IA identificada:** conteúdo gerado por agente aparece marcado, com fonte e botão de aceitar/editar/rejeitar.
6. **Acessibilidade WCAG 2.2 AA:** contraste mínimo 4.5:1, foco visível, navegação por teclado, rótulos em formulários, nada transmitido só por cor.
7. **Português do Brasil**, termos do meio (rubrica, termo de outorga, plano de trabalho, prestação de contas), datas DD/MM/AAAA, moeda R$ 1.234,56.

## Processo

1. Para cada persona do PRD, liste as 3 tarefas mais frequentes e desenhe o caminho mais curto até elas.
2. Monte o mapa de navegação e o inventário de telas (tela → RFs → persona).
3. Defina os tokens de design e os componentes base.
4. Especifique os dashboards (o que mostra, de onde vem o dado, quem vê).
5. Verifique com a lista do fim.

## Modelo de `docs/03-ux.md`

```markdown
# Gestprojet: guia de UX e interface

## 1. Princípios (os 7 acima, ajustados ao PRD)
## 2. Identidade visual
   Personalidade da marca (3 adjetivos), logotipo (orientações), tom de voz.
   Tokens: cores (primária, neutros, sucesso, alerta, erro, informação; modo claro e escuro,
   com contraste verificado), tipografia (família, escala), espaçamento (base 4/8 px), raios, sombras.
## 3. Arquitetura de informação
   Navegação principal: Início · Projetos · Financeiro · Prestação de contas · Documentos ·
   Maturidade (TRL/MRL) · Editais · Relatórios · Assistentes de IA · Administração.
   Mapa de telas (Mermaid) e inventário (tela · persona · RFs).
## 4. Dashboards
   - Portfólio (gestor): projetos por situação, execução financeira, vencimentos.
   - Projeto (coordenador): metas, cronograma, orçamento por rubrica, pendências, TRL atual × meta.
   - Financeiro: previsto × realizado × saldo por rubrica, remanejamentos, rendimentos.
   - Prestação de contas: checklist por exigência do edital, comprovantes faltantes.
   Para cada um: pergunta que responde, indicadores, fonte do dado, permissões.
## 5. Fluxos principais  (passo a passo das tarefas críticas, com estados de erro e vazio)
## 6. Componentes  (tabela de dados, card de indicador, linha do tempo, seletor de rubrica,
   upload de evidência, painel de sugestão da IA, trilha de auditoria)
## 7. Acessibilidade e responsividade  (critérios e pontos de quebra)
## 8. Questões em aberto
```

## Lista de verificação

- [ ] Toda persona chega às suas 3 tarefas em até 3 cliques a partir do início.
- [ ] Cores testadas para contraste nos dois temas.
- [ ] Todo dashboard declara fonte do dado e quem pode vê-lo.
- [ ] Estados vazio, carregando e erro definidos para as telas principais.
- [ ] Conteúdo de IA sempre identificado e revisável.
- [ ] Próximo passo indicado: `workflow-builder`.
