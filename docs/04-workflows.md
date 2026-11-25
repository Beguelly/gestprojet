# Gestprojet: fluxos de trabalho da 1ª versão

Versão: 0.2 · Data: 2026-11-25 · Status: rascunho (aguarda revisão; tarefa T-020, parte fluxos). A v0.1 era da tarefa T-015.

Fonte: `docs/01-prd.md` v0.2 (aprovado pelo dono, segundo o pedido da T-020; o cabeçalho do arquivo ainda diz "aguarda nova aprovação", T-008b) e `docs/00-briefing.md`. Este documento descreve **como o trabalho acontece dentro da plataforma** (modo processo da skill `workflow-builder`). Não repete os critérios de aceite do PRD; aponta para eles.

## Como ler

- **Papéis:** Líder, Membro (registra), Membro (visualiza), Pagador, Sistema (regra automática da plataforma), IA (só sugere, RN-014). Os papéis vêm do PRD, seção 3.
- **Depende de Q-xx:** o fluxo foi desenhado para funcionar com qualquer resposta à questão em aberto (PRD, seção 10). Este documento não escolhe nenhuma opção. A seção 14 resume, por questão, o que muda em cada fluxo.
- **`[SUPOSIÇÃO]`:** ponto que o PRD não define e que este documento precisou preencher para o fluxo fechar. Vale até o dono corrigir. A seção 15 lista os que viram pergunta ao PRD.
- **Mudanças da v0.2 deste documento:** fluxos novos 8 a 12 (importação do plano e linha de base, ajuste versionado, execução mensal e fechamento do período, gestão enxuta, checklist de saúde e fases); fluxos 1, 2, 3 e 4 revisados para o plano Meta → Etapa → Linha. As seções de apoio passaram de 8-12 para 13-17 (decisões humanas, dependências, divergências, catálogo de auditoria, lista de verificação). Os números dos fluxos 1 a 7 não mudaram.
- **Termos:** "rubrica" nas partes não alteradas lê-se "classificação da despesa" (RN-026). Quem financia é o "financiador"; "pagador" só existe na assinatura (RN-036).
- **Redação sobre normas:** "alinhado às práticas das ABNT NBR ISO 21500:2021, 21502:2021 e 21512:2026" ou "baseado em". Nunca "conformidade", "certificado" nem selo "ISO 21500" (RN-021). As normas não tratam de classificação da despesa, cotação, TRL/MRL nem regra de financiador.
- **Identificadores:** RF, RN, RNF e Q são os do PRD v0.2 e não foram renumerados. D1 a D25 são divergências deste documento (seção 15). `[NOVO v0.2]` e `[v0.2]` marcam o que este documento mudou.
- **Eventos de auditoria:** nomes no formato `dominio.acao`, **propostos** para alinhamento com `docs/06-seguranca.md` (T-009). Os eventos marcados "RF-112" estão na lista obrigatória do PRD. Os marcados "proposto" não estão nela e dependem do `seguranca` aceitar. Todo registro de auditoria guarda autor, data e hora, detalhe e, quando couber, valor anterior e novo (RF-112), e é imutável.
- **Notificações:** o PRD prevê aviso dentro da plataforma (RF-013, RF-103, RF-104) e e-mail em convite e cobrança (RF-030, RF-101, RF-102). Qualquer outro canal ou antecedência abaixo é `[SUPOSIÇÃO]`.
- **Valores monetários** em centavos inteiros (RN-009); nenhuma etapa usa ponto flutuante.
- **IA:** em todos os fluxos a IA só sugere, com rótulo e fonte (RF-090). A plataforma funciona sem IA (RF-091).

## Sumário dos fluxos

| # | Fluxo | RF principais | RN principais | Depende de |
|---|---|---|---|---|
| 1 `[v0.2]` | Ciclo de vida do projeto | RF-001, RF-004, RF-013, RF-020, RF-040, RF-104, RF-136, RF-137 | RN-001, RN-018, RN-020, RN-021, RN-024, RN-034 | Q-05, Q-12, Q-17 |
| 2 `[v0.2]` | Plano de trabalho: metas, etapas e linhas | RF-010 a RF-013, RF-024, RF-120 a RF-122, RF-132, RF-135 | RN-025, RN-026, RN-027, RN-033 | Q-20, Q-25, Q-29 |
| 3 `[v0.2]` | Despesa com checagem antes da compra, contra a linha do plano | RF-041 a RF-043, RF-050 a RF-055, RF-060 a RF-067, RF-130 | RN-004 a RN-008, RN-010, RN-012 a RN-015, RN-020, RN-024, RN-029, RN-032, RN-038 | Q-01, Q-02, Q-10, Q-11, Q-15, Q-19, Q-31 |
| 4 `[v0.2]` | Conta do projeto e rendimentos | RF-050 a RF-055 | RN-009 a RN-011, RN-020, RN-025 | Q-02, Q-09 |
| 5 | Avaliação TRL/MRL | RF-070 a RF-074, RF-012, RF-090 | RN-014, RN-016 | Q-03 |
| 6 | Entrada e saída de membros | RF-030 a RF-034, RF-110, RF-111 | RN-001 a RN-003, RN-022 | Q-09 |
| 7 | Assinatura por projeto | RF-100 a RF-105 | RN-017 a RN-019 | Q-04, Q-05, Q-16, Q-17, Q-18 |
| 8 `[NOVO v0.2]` | Importação do plano, conferência, OK e linha de base v1 | RF-120 a RF-128, RF-090, RF-091 | RN-014, RN-015, RN-025 a RN-031, RN-035, RN-037 | Q-23, Q-24, Q-25, Q-26, Q-27, Q-34, T-304 |
| 9 `[NOVO v0.2]` | Ajuste versionado da linha de base | RF-129, RF-121, RF-127 | RN-025, RN-027, RN-028, RN-031 | Q-26, Q-27 |
| 10 `[NOVO v0.2]` | Execução mensal e fechamento do período | RF-130, RF-131, RF-051, RF-053 | RN-010, RN-032, RN-038 | Q-22, Q-28, Q-30, T-012 |
| 11 `[NOVO v0.2]` | Riscos, questões, partes interessadas, comunicação e lições aprendidas | RF-021, RF-022, RF-133, RF-134, RF-136, RF-137 | RN-020, RN-022 | Q-12 |
| 12 `[NOVO v0.2]` | Checklist de saúde do projeto e fases | RF-020, RF-138, RF-136 | RN-021, RN-034 | Q-12, Q-30, T-012 |

Fora desta versão (não modelados): prestação de contas parcial e final, distribuição dos rendimentos, relato fotográfico e técnico, relatórios por etapa, gestão de bolsistas (PRD, seção 4.2) e a camada seguinte da gestão de projetos (RF-139 a RF-145: índices de custo e prazo, percentual por IA, fornecedores, caminho crítico, plano de qualidade completo, mudança organizacional e social, pós-projeto). Remanejamento entre rubricas como fluxo próprio continua "a confirmar com o dono" (PRD 4.2); mover valor entre linhas depois do OK é um ajuste (fluxo 9).

---

## 1. Ciclo de vida do projeto

### 1.1 Gatilho e atores

- **Gatilho de entrada:** o líder cadastra o projeto (RF-001).
- **Atores:** Líder (cria, prorroga, encerra); Sistema (muda por data e por efeito da assinatura); Membros (só veem o estado).
- **Três eixos independentes** `[v0.2]`. O **estado do projeto** (abaixo) diz se ele está em andamento, suspenso ou encerrado. A **fase** (RF-020: iniciação, planejamento, execução, controle, encerramento, baseadas no Anexo A da NBR ISO 21502:2021) diz em que ponto da gestão ele está; é marcada pelo líder, a plataforma só sugere avançar quando o checklist de saúde da fase está respondido, e a fase não trava nenhuma ação (RN-034). Ciclo da fase e do checklist: fluxo 12. A **situação do plano** (sem plano, minuta em conferência, linha de base vN, ajuste pendente) diz se a execução financeira por linha já vale: fluxos 8 e 9. Nenhum eixo depende do outro para mudar de valor, mas o painel mostra os três (RF-003).
- **Mudança de fase abre a revisão da justificativa** (RF-136): ao mudar de fase, "revisar justificativa e benefício esperado" vira pendência do líder até ser feita (mantida ou alterada, com nota e data).
- **Diferença em relação à skill:** a skill parte de "proposta → aprovado → contratado". No PRD o projeto só entra na plataforma já contratado (tem termo de outorga, RF-001 e RF-040), então os estados anteriores não existem aqui.

### 1.2 Diagrama

```mermaid
stateDiagram-v2
    [*] --> AguardandoInicio: líder cadastra e a data de início é futura
    [*] --> EmExecucao: líder cadastra e a data de início já chegou
    AguardandoInicio --> EmExecucao: chega a data de início
    EmExecucao --> Suspenso: efeito da assinatura configurado em T-802
    Suspenso --> EmExecucao: pagamento confirmado ou assinatura regularizada
    EmExecucao --> VigenciaEncerrada: passa a data de fim da vigência
    VigenciaEncerrada --> EmExecucao: líder prorroga a vigência com aditivo anexado
    EmExecucao --> EmExecucao: líder prorroga a vigência com aditivo anexado
    EmExecucao --> Encerrado: líder encerra
    VigenciaEncerrada --> Encerrado: líder encerra
    Suspenso --> Encerrado: líder encerra
    AguardandoInicio --> Encerrado: líder encerra
    Encerrado --> [*]: somente leitura, dados mantidos

    note right of Suspenso
        Efeito exato depende de Q-05 e T-802.
        Atraso não apaga dados.
    end note
    note right of Encerrado
        Saída da 1ª versão. Prestação de contas
        é 2ª versão. Exportação RF-106.
    end note
```

### 1.3 Estados e o que cada um permite

| Estado | Como entra | O que a plataforma faz | Quem sai e como |
|---|---|---|---|
| Aguardando início | Cadastro com início futuro `[SUPOSIÇÃO]` | Permite importar ou cadastrar o plano, conferir a minuta, dar o OK, registrar regras e equipe (fluxo 8). A checagem funciona, mas bloqueia compra com data prevista antes do início (RN-024). | Sistema, na data de início. |
| Em execução | Data de início chegou | Todas as funcionalidades da 1ª versão, conforme o papel de cada pessoa. A execução por linha e o previsto × executado só valem depois do OK da linha de base (RN-029, fluxos 8 e 10); sem o OK, a checagem fica "pendente: plano sem aprovação". | Sistema (vigência, assinatura) ou líder (encerrar, prorrogar). |
| Suspenso | Situação da assinatura com efeito de suspensão em T-802 | Aplica **exatamente o efeito configurado** (RF-104, RN-018). Pode ser somente leitura, aviso ou nada. Todos os membros veem o aviso. Nenhum dado é apagado. | Sistema, quando a assinatura volta ao normal. O líder também pode encerrar. |
| Vigência encerrada | Passou a data de fim | Projeto continua editável `[SUPOSIÇÃO]` (o líder ainda precisa fechar comprovantes e avaliar TRL/MRL). A checagem bloqueia compra com data prevista fora da vigência (RN-024). O painel pede o encerramento ou a prorrogação. | Líder prorroga ou encerra. |
| Encerrado | Líder marca (RF-004), vendo antes os itens de encerramento não atendidos (RF-137), sem que isso impeça a confirmação | Somente leitura; sai da lista principal; dados legíveis (RF-004). Exportação disponível (RF-106), agora com todas as versões da linha de base, ajustes, minutas e execução. Estado de saída da 1ª versão: aqui começaria a prestação de contas (2ª versão). | Fim. O PRD não prevê reabrir `[ver seção 10, item D1]`. |

### 1.4 Regras de negócio aplicadas

RN-001 (um líder), RN-018 (efeito da assinatura é configuração), RN-020 (nada é apagado), RN-022 (acesso só a quem é do projeto), RN-024 (compra fora da vigência é bloqueada pela checagem, Q-15). RN-021 `[ALTERADO v0.2]` (a tela da fase diz "baseado nas práticas das ISO 21500, 21502 e 21512", nunca "conforme", "certificado" nem cita a ISO 21500:2012 como vigente). RN-034 (o checklist da fase sinaliza, não aprova).

### 1.5 Evidências exigidas

- Cadastro: termo de outorga e edital em PDF (RF-040), com tipo, data, autor e hash. O PRD não torna o anexo obrigatório para criar o projeto; sem ele, o projeto aparece com pendência "termo de outorga não anexado" `[SUPOSIÇÃO]`.
- Prorrogação: aditivo em PDF anexado (RF-040 prevê "aditivos") `[SUPOSIÇÃO]` de que seja obrigatório.
- Encerramento: nenhuma evidência obrigatória; confirmação explícita do líder.

### 1.6 Eventos de auditoria

| Evento | Quando | Origem |
|---|---|---|
| `projeto.criado` | Cadastro | proposto |
| `projeto.vigencia_alterada` | Prorrogação (valor anterior e novo) | proposto |
| `projeto.suspenso` e `projeto.retomado` | Efeito da assinatura aplicado e retirado | proposto; ligado a "eventos de assinatura" (RF-112) |
| `projeto.encerrado` | Líder encerra | proposto |
| `documento.anexado` | Edital, termo, aditivo | proposto |
| `projeto.fase_alterada` (fase anterior e nova, líder) `[NOVO v0.2]` | Líder marca a fase | proposto |
| `projeto.justificativa_revisada` (mantida ou alterada, nota, versão anterior) `[NOVO v0.2]` | Revisão a cada mudança de fase (RF-136) | proposto |

### 1.7 Notificações

| Quem | O quê | Canal e antecedência |
|---|---|---|
| Líder e membros | Fim da vigência em 90, 60 e 30 dias (RF-013) | Na plataforma; prazos `[SUPOSIÇÃO]` do PRD (Q-20) |
| Líder | Vigência encerrada sem encerramento nem prorrogação | Na plataforma, pendência no painel `[SUPOSIÇÃO]` |
| Todos os membros | Projeto suspenso e retomado (RF-104) | Na plataforma |
| Líder | Revisão da justificativa pendente depois de mudar de fase (RF-136); sugestão de avançar de fase quando o checklist está respondido (RF-020) `[NOVO v0.2]` | Painel e pendências |

### 1.8 Caminhos de exceção

- **Data de fim anterior à de início:** cadastro recusado com indicação do campo (RF-001).
- **Prorrogação para data anterior à atual:** recusada `[SUPOSIÇÃO]`.
- **Usuário sem acesso abre o projeto pelo endereço:** "sem acesso", nenhum dado (RF-001, RN-022).
- **Edição em projeto encerrado:** recusada; dados continuam legíveis (RF-004).
- **Líder tenta encerrar com pendências abertas** (despesas sem checagem, comprovantes faltando, itens de encerramento do checklist não atendidos, ajuste pendente de aprovação externa, plano sem OK): a plataforma avisa e mostra a lista, e o líder pode encerrar assim mesmo, porque a pendência não é impedimento no PRD (RF-137, RN-034).
- **Encerrar com ajuste pendente de aprovação externa:** o ajuste fica como está, somente leitura, e não altera a versão vigente (RN-028) `[SUPOSIÇÃO]`.
- **Tarefas abertas ao encerrar:** continuam como estão, somente leitura.
- **Cobrança depois do fim da vigência:** depende de Q-17. O fluxo não muda; só a assinatura (fluxo 7) decide se continua cobrando.
- **Prazo de guarda dos dados depois de encerrado:** depende de Q-12 e de T-802.
- **Excluir projeto:** não existe (RN-020). Quem não quer mais o projeto o encerra.

### 1.9 Rastreio

RF-001, RF-002, RF-003, RF-004, RF-013, RF-020, RF-040, RF-104, RF-106, RF-136, RF-137, RF-138 (RF-023 foi removido no PRD v0.2) · RN-001, RN-018, RN-020, RN-021, RN-022, RN-024, RN-034 · Q-05, Q-12, Q-15, Q-17.

---

## 2. Plano de trabalho: metas, etapas e linhas de despesa `[ALTERADO v0.2]`

O plano é **Meta → Etapa → Linha de despesa** (RF-010, RF-120), único para todos os financiadores. Este fluxo trata do lado operacional do plano (situação e progresso das etapas, tarefas, marcos, aceite das entregas). **Como as linhas e os valores nascem** é o fluxo 8; **como mudam depois do OK** é o fluxo 9; **como a execução é acompanhada** é o fluxo 10.

### 2.1 Gatilho e atores

- **Gatilho:** projeto criado (fluxo 1) e o líder abre o plano: importa o arquivo do plano aprovado ou cadastra à mão (fluxo 8). Etapas, tarefas e marcos podem ser registrados antes do OK; linhas e valores só valem depois dele (RN-030).
- **Atores:** Líder (cria e importa a estrutura, define a medida de progresso de cada etapa, registra marcos e aceites, atribui responsáveis, informa percentual estimado); Membro (registra) (só dados operacionais: situação, andamento, entregas, tarefas, marcos concluídos; nunca linhas, valores nem classificações, RF-010); Membro (visualiza) (só lê); Sistema (soma os totais, marca atraso, calcula progresso, emite alertas).
- **Quem pode alterar linhas e valores:** só o líder, por importação, cadastro ou ajuste (RF-010, RF-129). A matriz do PRD (seção 3) manda: nenhum membro altera o plano aprovado, a linha de base nem pede ajuste.
- **Aprovação:** nenhuma para o andamento das etapas. O **aceite da entrega** é do líder (RF-135). A aprovação da estrutura e dos valores é o OK do líder (fluxo 8) e, para mudanças, o ajuste (fluxo 9).

### 2.2 Diagramas

**Situação de uma etapa** (RF-010). A tarefa, sub-item opcional da etapa, usa os mesmos estados `[SUPOSIÇÃO]`.

```mermaid
stateDiagram-v2
    [*] --> NaoIniciada: etapa criada com responsável, prazo e entrega esperada
    NaoIniciada --> EmAndamento: responsável inicia
    NaoIniciada --> Atrasada: prazo vence sem iniciar
    EmAndamento --> Atrasada: prazo vence sem concluir
    Atrasada --> EmAndamento: prazo é reprogramado para data futura
    EmAndamento --> Concluida: responsável conclui e anexa a entrega
    NaoIniciada --> Concluida: responsável conclui e anexa a entrega
    Atrasada --> Concluida: responsável conclui e anexa a entrega
    Concluida --> EmAndamento: reaberta com motivo
    Concluida --> [*]: entrega fica ligada à etapa

    note right of Atrasada
        Marcação automática à virada do dia, RF-010.
    end note
```

**Aceite da entrega** (RF-135, só o líder registra; o membro anexa a evidência).

```mermaid
stateDiagram-v2
    [*] --> EntregaEsperada: etapa com critério de aceitação e data
    EntregaEsperada --> AguardandoAceite: etapa concluída e evidência anexada
    AguardandoAceite --> Aceita: líder registra aceite com nota e evidência
    AguardandoAceite --> AceitaComPendencia: líder registra aceite com pendência
    AguardandoAceite --> NaoAceita: líder registra que não aceita
    AceitaComPendencia --> Aceita: pendência marcada como resolvida
    NaoAceita --> EmAndamento: etapa volta ao andamento com motivo
    EmAndamento --> AguardandoAceite: etapa concluída de novo
    Aceita --> [*]
```

**Medida de progresso** (RF-132, RN-033): cada etapa tem a medida definida antes de começar.

| Medida | Progresso da etapa | Observação |
|---|---|---|
| Marcos | marcos concluídos ÷ marcos da etapa | Marcos vêm do RF-011; o membro (registra) pode marcar concluído `[SUPOSIÇÃO]` |
| 0/100 | 0% até concluída, 100% ao concluir | Anotação de andamento em texto não muda o número |
| Percentual estimado | valor informado pelo líder, rotulado "estimado" e datado | Só o líder informa; a IA não calcula nem altera (RN-033, RF-140 é da camada seguinte) |

Progresso da meta = média simples das etapas; do projeto = média simples das metas `[SUPOSIÇÃO]`; a ponderação depende de Q-29 (o fluxo não muda, só a fórmula). Etapa sem medida definida não entra na média e aparece nas pendências. Mudar a medida depois que a etapa começou fica registrado com motivo.

Meta e projeto não têm estado próprio; mostram "não iniciada", "em andamento" ou "concluída" derivados das etapas `[SUPOSIÇÃO]`. A etapa pode ser de gestão administrativa e financeira com uma linha única (RF-120).

### 2.3 Passos

1. Líder cria ou importa as **metas** (número e título) e, dentro delas, as **etapas** (título, descrição, responsável, início, prazo, entrega esperada, critério de aceitação, medida de progresso) e as **linhas** (fluxo 8). **Tarefas** são sub-itens opcionais da etapa, sem valor financeiro (RF-010).
2. Líder define **marcos** (RF-011), por exemplo entregas ao financiador, ligados a etapas ou metas. Quando a etapa usa a medida "marcos", eles formam o progresso.
3. Responsável atualiza a situação, anota andamento e anexa a entrega (RF-012). O membro (registra) não toca em linhas nem valores.
4. Sistema, todo dia: marca "atrasada" a etapa ou tarefa vencida e não concluída (RF-010); recalcula progresso; emite alertas (RF-013); calcula "dias sem atualização" do plano (RF-024). Totais de linha, etapa, meta e projeto são sempre calculados pela soma, nunca digitados (RN-025).
5. Ao concluir a etapa, o líder registra o aceite da entrega (aceita, aceita com pendência, não aceita), com nota e evidência (RF-135). A pendência de "aceita com pendência" fica visível até ser marcada como resolvida.
6. A entrega anexada pode servir de evidência TRL/MRL (fluxo 5, RF-071).

### 2.4 Regras de negócio aplicadas

RN-022 (acesso só ao projeto), RN-025 (a soma fecha), RN-026 (classificação configurável), RN-027 (linha de base não é reescrita), RN-033 (progresso objetivo), RN-003 e a matriz da seção 3 do PRD (quem edita).

### 2.5 Evidências exigidas

- **Entrega da etapa ou tarefa:** anexo ligado, com tipo, data e autor (RF-012). O PRD diz "anexa a entrega" no critério de aceite, mas não torna o anexo obrigatório para concluir `[ver seção 15, item D4]`. Este documento trata o anexo como obrigatório quando a etapa tem "entrega esperada" definida `[SUPOSIÇÃO]`.
- **Aceite:** nota e evidência anexada (RF-135).
- **Percentual estimado:** data e autor da estimativa.
- Marco: sem evidência obrigatória.

### 2.6 Eventos de auditoria

| Evento | Quando | Origem |
|---|---|---|
| `tarefa.concluida` | Conclusão, com autor e data (RF-012) | critério de aceite do RF-012 |
| `plano.item_criado`, `plano.item_alterado` (valor anterior e novo, incluindo prazo e responsável) | Criação e alteração operacional de etapa, tarefa e marco. Mudança de linha, valor ou classificação depois do OK **não** passa por aqui: é `ajuste.*` (fluxo 9) | proposto |
| `tarefa.atrasada` | Marcação automática | proposto (pode ser só derivada, sem registro) |
| `marco.criado`, `marco.alterado`, `marco.concluido` | Marcos | proposto |
| `etapa.medida_definida`, `etapa.medida_alterada` (motivo) `[NOVO v0.2]` | Medida de progresso (RF-132) | proposto |
| `etapa.percentual_estimado_registrado` (valor, data, líder) `[NOVO v0.2]` | Percentual estimado | proposto |
| `entrega.aceite_registrado` (aceita, com pendência, não aceita; nota; evidência) `[NOVO v0.2]` | Aceite da entrega | RF-112 (aceites de entrega) |
| `entrega.pendencia_resolvida` `[NOVO v0.2]` | Pendência do aceite resolvida | proposto |

### 2.7 Notificações

| Quem | O quê | Canal e antecedência |
|---|---|---|
| Responsável da tarefa ou etapa | Prazo em 7 dias; atrasada (RF-013) | Na plataforma; 7 dias é `[SUPOSIÇÃO]` do PRD (Q-20) |
| Líder | Etapas e tarefas atrasadas, marcos nos próximos 15 dias, plano sem atualização há mais de 30 dias (RF-003, RF-011, RF-024) | Painel e pendências |
| Líder | Etapa sem medida de progresso; etapa sem critério de aceitação ou sem data; "aceita com pendência" não resolvida (RF-132, RF-135) `[NOVO v0.2]` | Painel e pendências |
| Responsável novo | Etapa ou tarefa atribuída a ele `[SUPOSIÇÃO]` | Na plataforma |

### 2.8 Caminhos de exceção

- **Prazo fora da vigência do projeto:** a plataforma avisa e pede confirmação (RF-010).
- **Membro "visualiza" tenta alterar:** recusado (RF-012). **Membro (registra) tenta alterar linha, valor ou classificação:** ação indisponível; o caminho é pedir ao líder (RF-010, RF-129).
- **Responsável perde o acesso** (fluxo 6): as etapas e tarefas dele continuam no plano com o nome dele e viram pendência "sem responsável ativo" para o líder reatribuir `[SUPOSIÇÃO]`.
- **Projeto encerrado ou suspenso:** edição recusada ou conforme efeito de T-802 (fluxos 1 e 7).
- **Prazo vencido e etapa reprogramada para o futuro:** volta de "atrasada" para "em andamento" `[SUPOSIÇÃO]`.
- **Dois membros editam a mesma etapa ao mesmo tempo:** vale a última gravação, com os dois registros na auditoria `[SUPOSIÇÃO]`; deve ser tratado na SPEC.
- **Pessoa sem acesso busca item do plano:** não encontra (RN-022, RF-033).
- **Etapa sem medida de progresso:** fica fora da média e aparece nas pendências (RF-132).
- **Medida mudada com a etapa já iniciada:** permitido, com motivo registrado (RF-132). O progresso anterior fica no histórico `[SUPOSIÇÃO]`.
- **Etapa "0/100" com andamento anotado em texto:** o progresso continua 0% até concluir (RF-132).
- **Aceite "não aceita":** a etapa volta ao andamento com o motivo; o aceite anterior continua no histórico `[SUPOSIÇÃO]`.
- **Plano ainda sem OK:** etapas, tarefas e marcos funcionam; os valores aparecem como minuta ("minuta: não vale") e o previsto × executado não é exibido como valendo (RF-003, RN-030).
- **Marco concluído por quem não é responsável:** o PRD não define; vale a permissão de "registra" `[SUPOSIÇÃO]`.

### 2.9 Rastreio

RF-003, RF-010, RF-011, RF-012, RF-013, RF-024, RF-033, RF-071, RF-120, RF-121, RF-122, RF-132, RF-135 · RN-003, RN-022, RN-025, RN-026, RN-027, RN-033 · Q-20, Q-25, Q-29.

---

## 3. Despesa com checagem antes da compra `[ALTERADO v0.2]`

Este é o fluxo central da 1ª versão e o que evita o erro que originou o produto. Na v0.2 a checagem compara a compra com a **linha** do plano (objeto previsto, classificação, saldo da linha) além das regras do edital (RF-060, RF-063, RF-064). O fluxo existente foi atualizado; não há segundo fluxo de despesa. O caso real (RF-062) continua intacto.

### 3.1 Gatilho e atores

- **Gatilho:** alguém do projeto vai comprar algo e abre "Vou comprar" (RF-060).
- **Atores:** Líder e Membro (registra) pedem a checagem e lançam a despesa. Só o **Líder** enquadra item pendente (RF-066), supera bloqueio (RF-065) e confirma regras (RN-004). **Sistema** calcula o resultado pelas regras confirmadas. **IA** pode sugerir categoria, classificação e linha do plano (RF-067, Could) e propor regras a partir do PDF (RF-043, Could), sempre sem efeito próprio. A escolha da linha e a **declaração de que o item corresponde ao objeto previsto** são da pessoa que pede a checagem; a plataforma não faz leitura automática de equivalência (RF-063).
- **O que a plataforma não faz** (PRD, seção 4.3): comprar, pagar fornecedor ou enviar documento ao financiador. Ela confere e registra; a compra acontece fora dela. Por isso este fluxo **não tem** as etapas de aprovação, pagamento e conciliação da skill: a "aprovação" aqui é o resultado da checagem, e a decisão de comprar é da pessoa (RN-012). A conciliação com extrato só existe se T-012 incluir importação (fluxo 4).

### 3.2 Pré-condição: regras confirmadas

A checagem só usa regras **confirmadas pelo líder** (RN-004), na **versão vigente** no momento do pedido (RN-005). Como as regras chegam (cadastro manual ou proposta da IA a partir do PDF) depende do que resta de Q-01: a T-011 foi decidida só para o **plano de trabalho** (fluxo 8); ler o edital por IA para propor regras segue em aberto. Nas duas formas, nada vale antes da confirmação.

Há uma segunda pré-condição, nova na v0.2: o **plano precisa ter linha de base com OK** (fluxo 8). Sem ela, a checagem registra "pendente: plano sem aprovação" (RN-029), com link para a conferência do plano. Nenhuma regra do edital substitui essa condição.

```mermaid
stateDiagram-v2
    [*] --> Rascunho: regra registrada ou proposta
    Rascunho --> SemFonte: salva sem cláusula e página
    SemFonte --> Rascunho: líder informa a fonte
    Rascunho --> Confirmada: líder confirma
    SemFonte --> Confirmada: líder confirma assim mesmo, fica marcada sem fonte
    Rascunho --> Descartada: líder descarta a proposta
    Confirmada --> NovaVersao: líder altera
    NovaVersao --> Confirmada: líder confirma a nova versão
    Confirmada --> Desativada: líder desativa
    Descartada --> [*]
    Desativada --> [*]

    note right of Rascunho
        Proposta da IA entra aqui rotulada
        sugestão da IA. Só existe se Q-01 incluir a IA.
    end note
```

Observação: o PRD diz que regra sem fonte "fica marcada e aparece em pendências" (RF-041) e que só a confirmada é usada (RN-004). Não diz se uma regra sem fonte pode ser confirmada. O diagrama permite, com a marca `[SUPOSIÇÃO]`; ver seção 10, item D5.

### 3.3 Diagrama da checagem (cada checagem é um registro imutável)

```mermaid
stateDiagram-v2
    [*] --> Preenchendo: pessoa abre Vou comprar
    Preenchendo --> Calculando: pede a checagem
    Preenchendo --> Cancelada: desiste
    Calculando --> Permitido: nenhuma verificação bloqueia e todas são decididas
    Calculando --> Bloqueado: alguma verificação bloqueante falha
    Calculando --> Pendente: nada bloqueia, mas alguma não pode ser decidida, inclusive plano sem OK e item sem linha
    Permitido --> VinculadaADespesa: despesa lançada com este vínculo
    Permitido --> Substituida: pessoa refaz a checagem
    Bloqueado --> Substituida: pessoa corrige e refaz
    Bloqueado --> BloqueioSuperado: líder justifica e anexa autorização
    Bloqueado --> VinculadaADespesa: despesa lançada mesmo assim
    Pendente --> Substituida: líder enquadra o item, dá o OK do plano ou ajusta a linha e a checagem é refeita
    Pendente --> VinculadaADespesa: despesa lançada mesmo assim
    BloqueioSuperado --> VinculadaADespesa: despesa lançada
    VinculadaADespesa --> [*]
    Substituida --> [*]
    Cancelada --> [*]

    note right of Bloqueado
        O resultado original nunca muda (RN-013).
        BloqueioSuperado é uma marca ao lado
        do resultado. Depende de Q-10.
    end note
    note right of Pendente
        Motivos de pendência da v0.2 são plano sem
        aprovação, RN-029, e item sem linha, Q-31.
        A checagem guarda a versão da linha de base.
    end note
```

### 3.4 Verificações e resultado (RF-063, RN-006) `[ALTERADO v0.2]`

A checagem aplica as verificações na ordem abaixo, sempre com a versão vigente das regras confirmadas **e a versão vigente da linha de base**, e guarda as duas versões (RF-064).

| # | Verificação | Passa | Bloqueia | Fica pendente |
|---|---|---|---|---|
| 1 | Plano | O projeto tem linha de base com OK | Nunca bloqueia | Sem OK: **"pendente: plano sem aprovação"** (RN-029). As verificações 3, 4 e 5 não são decididas; 2, 6, 7 e 8 continuam sendo feitas e mostradas |
| 2 | Item | Permitido nas regras | Vedado | Fora das regras ("não encontrei") |
| 3 | Linha e objeto | A pessoa escolheu uma linha da etapa informada e declarou que o item corresponde ao objeto previsto dela (a tela mostra o objeto ao lado; fica registrada a declaração) | Nunca bloqueia (Q-31) | "Não encontrei linha para este item": pendente, com a saída de pedir ajuste (fluxo 9) ou desistir da compra. A linha precisa pertencer à etapa informada |
| 4 | Classificação | A classificação da linha é a admitida para o item pelas regras | Outra classificação; indica a correta quando a regra a define e sugere as linhas da etapa com ela | Item sem classificação definida na regra `[SUPOSIÇÃO]` |
| 5 | Saldo da linha | Valor estimado ≤ saldo da linha, aprovado menos executado na versão vigente (RN-010) | Valor maior; mostra o saldo da linha | Linha sem valor aprovado `[SUPOSIÇÃO]` |
| 6 | Cotações | Cotações válidas (RN-008) ≥ mínimo da faixa de valor | Menos que o mínimo | Sem regra de cotação cadastrada |
| 7 | Limites | Dentro do limite cadastrado | Acima do limite | Sem limite cadastrado: passa (não há o que conferir) |
| 8 | Vigência | Data prevista dentro da vigência | Fora (RN-024, Q-15) | Sem pendência |

- **Resultado final (RN-006):** "bloqueado" se qualquer verificação bloqueia; senão "pendente" se alguma não pôde ser decidida (inclui regras não confirmadas que afetariam o caso, plano sem OK e item sem linha); senão "permitido". Bloqueio tem precedência sobre pendência. Consequência: com o plano sem OK, um item vedado ou sem as cotações mínimas continua "bloqueado" (as verificações 2, 6, 7 e 8 não dependem do plano); só o item permitido e sem outro bloqueio vira "pendente: plano sem aprovação" `[ver seção 15, item D25]`.
- **A declaração de correspondência não é leitura automática.** Se a pessoa declara que o item corresponde ao objeto da linha, a verificação 3 passa; o PRD não define outra forma de checar (RF-063). Se isso basta ou se "item sem linha" deve bloquear: depende de Q-31.
- **O resultado é sempre calculado pelas regras**, nunca pela IA (RF-067, RN-014).
- **Saldo e reserva (Q-19):** com a regra atual (RN-010), checagem "permitido" ainda não lançada **não** reserva saldo da linha. Se o dono responder que deve reservar, a verificação 5 passa a subtrair as checagens "permitido" em aberto; o resto do fluxo não muda.
- **Saldo da linha usa a versão vigente da linha de base.** Ajuste pendente de aprovação externa não altera a versão vigente (RN-028); a checagem usa a vigente e pode avisar, na tela, que há ajuste pendente envolvendo aquela linha `[SUPOSIÇÃO]`.
- **Faixa de cotação:** quantidade, faixas, validade da cotação e limite inclusivo ou exclusivo são campos da regra, por edital (RN-007, RF-063). Contagem de cotações do mesmo fornecedor depende de Q-11 (RN-008 supõe uma só).

### 3.5 Diagrama da despesa (marca da checagem; a plataforma nunca impede o lançamento, RN-012)

```mermaid
stateDiagram-v2
    [*] --> ComChecagemPermitida: lançada com checagem permitido vinculada
    [*] --> SemChecagem: lançada sem checagem vinculada
    [*] --> CompradaComBloqueio: lançada com checagem bloqueada vinculada
    [*] --> CompradaComPendente: lançada com checagem pendente vinculada
    CompradaComBloqueio --> BloqueioSuperado: líder supera com justificativa e anexo
    ComChecagemPermitida --> ValorDivergente: valor lançado maior que o checado
    ValorDivergente --> ComChecagemPermitida: nova checagem com o valor correto
    SemChecagem --> Estornada: correção por estorno com motivo
    CompradaComBloqueio --> Estornada: correção por estorno com motivo
    CompradaComPendente --> Estornada: correção por estorno com motivo
    ComChecagemPermitida --> Estornada: correção por estorno com motivo
    BloqueioSuperado --> Estornada: correção por estorno com motivo
    Estornada --> [*]: original mantido, saldo da rubrica devolvido

    note right of SemChecagem
        Vai para as pendências do líder e
        para a auditoria (RN-012).
    end note
    note right of CompradaComPendente
        O PRD não define esta marca.
        Ver seção 10, item D2.
    end note
```

### 3.5b Diagrama do vínculo da despesa com a linha `[NOVO v0.2]` (RF-051, RF-130, RN-029, RN-038)

Segunda marca da despesa, independente da marca da checagem (3.5). O vínculo com a linha define a etapa, a meta, a classificação e o mês de competência (data da despesa, RN-032).

```mermaid
stateDiagram-v2
    [*] --> ComLinha: lançada com linha escolhida e o plano tem OK
    [*] --> SemLinha: lançada sem linha ou antes do OK da linha de base
    SemLinha --> ComLinha: líder vincula a uma linha
    ComLinha --> ComLinha: líder muda a linha com motivo
    ComLinha --> SaldoNegativo: executado da linha passa do aprovado
    SaldoNegativo --> ComLinha: ajuste aumenta a linha ou estorno devolve saldo
    ComLinha --> Estornada: correção por estorno com motivo
    SemLinha --> Estornada: correção por estorno com motivo
    SaldoNegativo --> Estornada: correção por estorno com motivo
    Estornada --> [*]: original mantido, saldo da linha devolvido

    note right of SemLinha
        Vai para as pendências do líder. Vale
        para despesa lançada antes do OK, RN-029.
    end note
    note right of SaldoNegativo
        Não bloqueia o lançamento, RN-038.
        Destaque, pendência e item do checklist.
    end note
```

O PRD não diz quem pode vincular a despesa à linha depois do OK; RF-130 diz "o líder a vincula". Vale só o líder `[SUPOSIÇÃO]`; o membro (registra) escolhe a linha ao lançar. Mudar a linha de uma despesa já vinculada não está no PRD `[SUPOSIÇÃO]`: fica registrado com motivo e vale a nova linha para a execução, sem apagar o vínculo anterior (RN-020).

### 3.6 Diagrama da comprovação da despesa

```mermaid
stateDiagram-v2
    [*] --> SemNotaFiscal: despesa lançada
    SemNotaFiscal --> ComNotaFiscal: nota fiscal anexada
    SemNotaFiscal --> SemNotaHaMaisDe30Dias: passam 30 dias sem nota fiscal
    SemNotaHaMaisDe30Dias --> ComNotaFiscal: nota fiscal anexada
    ComNotaFiscal --> Comprovada: comprovante de pagamento anexado
    Comprovada --> [*]

    note right of SemNotaHaMaisDe30Dias
        Aparece nas pendências do painel.
        30 dias é SUPOSIÇÃO do PRD (RF-055).
    end note
```

O PRD só exige nota fiscal para tirar a despesa das pendências (RF-055). O comprovante de pagamento é um tipo de anexo aceito, sem pendência própria; o estado "Comprovada" é só um rótulo de apoio `[SUPOSIÇÃO]`.

### 3.7 Passos

1. **Pedir a checagem (RF-060).** Pessoa informa item (descrição e categoria, ou "não encontrei"), quantidade, valor estimado, **etapa e linha do plano** em que a compra entra (a tela mostra ao lado o objeto previsto, a classificação e o saldo da linha, ou "não encontrei linha"), data prevista, fornecedor escolhido e anexa as cotações (fornecedor, valor, data, arquivo). Declara que o item corresponde ao objeto da linha. Funciona no celular, com foto da cotação (RNF-07).
2. **Sugestão opcional da IA (RF-067, Could).** Categoria, classificação e linha, rotuladas e com a regra ou o trecho do objeto citado; só mudam o campo se a pessoa aceitar. Se a IA estiver indisponível, o formulário segue normal (RF-091).
3. **Cálculo (RF-063, RN-006).** Resultado em até 3 s (RNF-01). Cada verificação aparece com situação, motivo em linguagem simples e fonte (RF-061). Sem OK do plano, o resultado mostra "pendente: plano sem aprovação" com o link para a conferência (fluxo 8) e continua mostrando as verificações de item, cotações, limites e vigência.
4. **Registro imutável (RF-064).** Quem pediu, quando, dados, **linha escolhida**, cotações, versão das regras, **versão da linha de base**, resultado e motivos.
5. **Ramificação conforme o resultado:**
   - **Permitido:** a pessoa compra fora da plataforma e lança a despesa vinculando a checagem.
   - **Bloqueado:** a tela mostra cada motivo e o que fazer ("anexe mais 2 cotações"). Caminhos: (a) corrigir e refazer a checagem, que cria **novo** registro; (b) desistir; (c) o líder superar o bloqueio com justificativa e anexo (RF-065, Should, depende de Q-10); (d) comprar assim mesmo e lançar a despesa, que fica marcada (RN-012). Anexar cotações **não libera item vedado** (RF-062).
   - **Pendente por item fora das regras:** o líder enquadra o item (RF-066): cria ou ajusta uma regra com fonte e confirma, ou registra que o item não deve ser comprado. A checagem é refeita com a nova versão das regras e a pendente fica no histórico.
   - **Pendente por plano sem aprovação (RN-029):** o líder confere a minuta e dá o OK (fluxo 8); depois, a pessoa refaz a checagem, que cria novo registro. Se a compra não pode esperar, a pessoa pode comprar e lançar a despesa, que fica "sem linha" e "comprada com checagem pendente" (RN-012).
   - **Pendente por item sem linha (Q-31):** o líder pede ajuste (fluxo 9) para criar ou alterar a linha, ou a pessoa desiste da compra. Depois que o ajuste vira vigente, a checagem é refeita com a nova versão da linha de base.
6. **Lançar a despesa (RF-051, RF-064, RF-130).** Pessoa vincula a checagem e a linha. A plataforma marca a despesa conforme as tabelas das seções 3.5 e 3.5b e atualiza o executado e o saldo da **linha**, da etapa, da meta e do projeto ao centavo, no mês de competência da data da despesa (RN-032). Despesa vinda de extrato (T-012) entra "a classificar" até ter classificação e linha (RF-052).
7. **Comprovar (RF-055).** Anexa nota fiscal, cotações restantes e comprovante de pagamento.
8. **Painel (RF-003, RF-064, RF-131).** Despesas sem checagem, sem linha e compradas com bloqueio entram nas pendências do líder; linha com saldo negativo aparece destacada (RN-038); o percentual de despesas com checagem prévia alimenta a meta O3. A execução por mês e o fechamento do período são o fluxo 10.

### 3.8 Caso real (RF-062) percorrendo o fluxo `[ALTERADO v0.2]`

Regras confirmadas no projeto de exemplo: material X vedado (cláusula N, página P) e 3 cotações exigidas para a faixa de valor do item. O RF-062 não mudou: os quatro cenários abaixo dão o mesmo resultado **com ou sem OK do plano**, porque o bloqueio vem das verificações de item e de cotações, que não dependem do plano, e o bloqueio tem precedência sobre a pendência (RN-006).

| Cenário | Verificações | Resultado | Motivos exibidos | Marca se comprar e lançar |
|---|---|---|---|---|
| Material X, 1 cotação | item: bloqueia; cotações: bloqueia | **Bloqueado** | "item vedado pelo edital (cláusula N, página P)" e "cotações anexadas: 1 de 3 exigidas" | "comprada com checagem bloqueada"; painel do líder e auditoria |
| Mesmo item, agora 3 cotações | item: bloqueia; cotações: passa | **Bloqueado** | só "item vedado" | idem |
| Item permitido, 2 de 3 cotações | item: passa; cotações: bloqueia | **Bloqueado** | só "cotações: 2 de 3 exigidas" | idem |
| Item permitido, linha certa, classificação certa, saldo da linha, 3 cotações válidas, plano com OK | todas passam | **Permitido** | cada verificação atendida, com fonte | "com checagem permitida", "com linha" |

Cenários novos da v0.2 (RF-063):

| Cenário | Verificações | Resultado | Motivo exibido |
|---|---|---|---|
| Item permitido, 3 cotações, **plano sem OK** | plano: pendente; item e cotações: passam | **Pendente** | "plano sem aprovação" e link para a conferência |
| Item permitido em custeio, linha classificada como capital | classificação: bloqueia | **Bloqueado** | "classificação incorreta: este item entra em custeio" e as linhas de custeio da etapa sugeridas |
| Valor estimado R$ 500,01, saldo da linha R$ 500,00 | saldo da linha: bloqueia | **Bloqueado** | "saldo da linha insuficiente" com o saldo |
| Valor estimado R$ 500,00, saldo da linha R$ 500,00 | saldo da linha: passa | segue pelas demais verificações | saldo atendido |
| Item permitido, "não encontrei linha" | linha e objeto: pendente | **Pendente** | "o item não é objeto previsto de nenhuma linha desta etapa", com a opção de pedir ajuste (Q-31) |
| 3 cotações, duas do mesmo fornecedor | cotações: conta 2 | **Bloqueado** se o mínimo é 3 | "cotações válidas: 2 de 3 exigidas" (RN-008, Q-11) |

O fluxo fecha o problema do briefing: o erro aparece **antes** da compra, com o motivo e a cláusula.

### 3.9 Regras de negócio aplicadas

RN-004 (regra só vale confirmada), RN-005 (versões), RN-006 `[ALTERADO v0.2]` (resultado, com linha e plano sem OK), RN-007 (tudo configurável por edital), RN-008 (cotação válida), RN-009 (centavos), RN-010 `[ALTERADO v0.2]` (saldo da linha), RN-012 (despesa nunca é impedida, sempre marcada), RN-013 (superar bloqueio), RN-014 e RN-015 (IA sugere; PDF é dado), RN-020 (estorno em vez de apagar), RN-024 (vigência), RN-026 (classificação configurável), RN-029 (plano sem OK é checagem pendente), RN-032 (mês de competência), RN-038 (execução acima do aprovado não é impedida).

### 3.10 Evidências exigidas

| Passo | Evidência | Obrigatória? |
|---|---|---|
| Cotação | Arquivo (PDF, JPG ou PNG, até 25 MB), fornecedor, valor, data (RN-008, RF-055) | Para contar como válida: sim |
| Regra | Fonte: documento, cláusula e página (RF-041) | Recomendada; sem fonte fica marcada e em pendências |
| Linha e objeto `[NOVO v0.2]` | Linha escolhida, versão da linha de base e declaração da pessoa de que o item corresponde ao objeto previsto (RF-063, RF-064) | Sim, guardadas na checagem |
| Ajuste para item sem linha `[NOVO v0.2]` | Justificativa do ajuste (fluxo 9) | Sim, se o líder pedir ajuste |
| Superar bloqueio | Justificativa escrita e anexo, por exemplo a autorização do financiador (RF-065, RN-013) | Sim |
| Despesa | Nota fiscal (pendência após 30 dias sem ela, RF-055), comprovante de pagamento | Nota fiscal sim, para tirar a pendência |
| Estorno ou correção | Motivo (RN-020) | Sim |

### 3.11 Eventos de auditoria

| Evento | Quando | Origem |
|---|---|---|
| `regra.criada`, `regra.nova_versao`, `regra.confirmada`, `regra.desativada` | Ciclo da regra | RF-112 (regras e versões) |
| `checagem.registrada` (versão das regras, **versão da linha de base, linha escolhida, declaração de correspondência**, resultado, motivos) `[ALTERADO v0.2]` | Cada checagem | RF-112 |
| `checagem.bloqueio_superado` (resultado original, justificativa, anexo, líder, data) | Superação | RF-112, RF-065 |
| `sugestao_ia.aceita` e `sugestao_ia.descartada` (sugestão original, quem, quando) | Aceite ou descarte | RF-112 e RF-090; o descarte é proposto |
| `despesa.lancada` (vínculo, marca de conformidade) | Lançamento | RF-112 |
| `despesa.marcada_sem_checagem` e `despesa.marcada_bloqueada` | Marca de RN-012 | RF-062, RN-012 |
| `despesa.marcada_sem_linha` e `despesa.vinculada_linha` (linha, etapa, meta, mês de competência) `[NOVO v0.2]` | Despesa sem linha (RN-029) e vínculo posterior pelo líder | proposto; ligado a "lançamentos financeiros" (RF-112) |
| `despesa.saldo_negativo_detectado` (linha, valor) `[NOVO v0.2]` | Execução acima do aprovado (RN-038) | proposto; pode ser só derivado |
| `despesa.estornada` ou `despesa.corrigida` (motivo, valor anterior e novo) | Correção | RF-112, RN-020 |
| `comprovante.anexado` | Nota fiscal, cotação, comprovante | proposto |

### 3.12 Notificações

| Quem | O quê | Canal |
|---|---|---|
| Quem pediu | Resultado e motivos | Na tela, imediato (RNF-01) |
| Líder | Despesa sem checagem; despesa comprada com bloqueio ou pendência; checagem pendente aguardando enquadramento; regra sem fonte; regras aguardando confirmação (RF-003, RF-041, RN-012) | Painel e pendências. Aviso ativo (sino ou e-mail) é `[SUPOSIÇÃO]` |
| Líder | Classificação ou linha com saldo negativo (RF-053, RF-130, RN-038) | Painel e pendências |
| Líder | Despesa "sem linha"; checagens "pendente: plano sem aprovação" aguardando o OK do plano; checagens "item sem linha" aguardando ajuste (RN-029, Q-31) `[NOVO v0.2]` | Painel e pendências |
| Quem pediu | Checagem pendente foi refeita após enquadramento ou após o OK do plano `[SUPOSIÇÃO]` | Na plataforma |
| Líder e membros | Despesa sem nota fiscal há mais de 30 dias (RF-055) | Painel e pendências |

### 3.13 Caminhos de exceção

- **Regras ainda não confirmadas:** a checagem não as usa e avisa que há regras aguardando confirmação (RF-041); o resultado nunca é "permitido" por causa de regra que não vale. Quando essas regras afetariam o caso, o resultado é "pendente" (RN-006).
- **Nenhuma regra de cotação cadastrada:** verificação pendente, com o aviso "defina a exigência de cotações ou marque que o edital não exige" (RF-041, RF-063).
- **Item "não encontrei":** resultado "pendente"; líder enquadra (RF-066).
- **Membro tenta superar bloqueio:** ação indisponível (RF-065). Líder sem justificativa ou sem anexo: recusado.
- **Bloqueio é definitivo (se Q-10 disser que não existe superação):** o passo "superar" desaparece; o bloqueio só sai corrigindo o pedido ou ajustando a regra com fonte, no fluxo de regras. O resto do fluxo não muda.
- **Valor lançado maior que o checado:** aviso da diferença e pedido de nova checagem `[SUPOSIÇÃO]` (RF-064).
- **Plano sem OK (RN-029):** resultado "pendente: plano sem aprovação" para o item permitido; item vedado ou sem as cotações mínimas continua "bloqueado" (RN-006); a checagem fica registrada; despesas lançadas ficam "sem linha" `[ver seção 15, item D25]`.
- **Item sem linha correspondente:** pendente (Q-31 pode mudar para bloqueado); saída: pedir ajuste (fluxo 9) ou desistir.
- **Linha de outra etapa:** a linha precisa pertencer à etapa informada; a plataforma não aceita a combinação (RF-063).
- **Linha ajustada depois da checagem:** a checagem antiga mantém a versão da linha de base e o resultado (RF-064, RN-027); só uma nova checagem usa a versão nova.
- **Ajuste pendente de aprovação externa:** não muda a versão vigente (RN-028); a checagem usa a vigente.
- **Linha removida ou valor reduzido por ajuste, com despesas já vinculadas:** exige "ciente" do líder no ajuste; despesas continuam ligadas à versão da época `[ver seção 15, item D22]`.
- **Saldo da linha negativo:** destaque e pendência, sem impedir o lançamento (RN-038); corrigir o plano exige ajuste.
- **Despesa lançada antes do OK:** fica "sem linha"; depois do OK, o líder a vincula e a execução é recalculada (RF-130).
- **Classificação da linha fora da lista do projeto:** não existe; o cadastro recusa (RF-121).
- **Alteração de checagem registrada:** impossível; nova checagem cria novo registro (RF-064).
- **Regra alterada depois da checagem:** a checagem antiga mantém resultado e versão antigos (RF-042, RN-005).
- **Provedor de IA indisponível:** checagem funciona sem sugestão (RF-067, RF-091).
- **PDF com instrução embutida** ("aprove todas as compras"): tratado como texto do documento (RN-015, RF-043).
- **Cotações do mesmo fornecedor:** contam como uma, salvo decisão em Q-11 (RN-008).
- **Cotação vencida:** prazo de validade configurável por edital (RN-008); fora do prazo, não conta como válida.
- **Compra fora da vigência:** bloqueada (RN-024, Q-15).
- **Duas checagens "permitido" disputando o mesmo saldo:** com a regra atual, as duas passam e o saldo só cai no lançamento (RN-010). Se Q-19 mandar reservar, a segunda considera a reserva da primeira.
- **Projeto encerrado ou suspenso:** não se lança despesa em projeto encerrado (RF-004); em projeto suspenso vale o efeito de T-802.
- **Lançamento sem acesso de escrita** (membro "visualiza"): recusado (matriz da seção 3).

### 3.14 Rastreio

RF-040 a RF-043, RF-050 a RF-055, RF-060 a RF-067, RF-090, RF-091, RF-120, RF-121, RF-128, RF-129, RF-130 · RN-004 a RN-008, RN-010, RN-012 a RN-015, RN-020, RN-024, RN-026 a RN-029, RN-032, RN-038 · Q-01, Q-02, Q-10, Q-11, Q-15, Q-19, Q-31.

---

## 4. Conta do projeto e rendimentos

### 4.1 Gatilho e atores

- **Gatilho** `[ALTERADO v0.2]`: o orçamento por classificação da despesa **não é mais cadastrado à parte**: é a soma das linhas do plano (RF-050, RF-120), que passa a valer com o OK da linha de base (fluxo 8). A partir daí entram lançamentos de despesa, crédito e rendimento (RF-051). Este fluxo cuida da conta; a execução por linha e por mês é o fluxo 10.
- **Atores:** Líder (orçamento, créditos, rendimentos, despesas, estornos); Membro (registra) (somente despesas, RF-051; créditos e rendimentos dependem de Q-09); Sistema (calcula saldos, deduplica importação).
- **Como o lançamento entra depende de Q-02 (T-012):** manual, importação de extrato ou integração bancária. Nos três casos o registro é o mesmo, com a origem anotada (manual, extrato, banco).
- **Fora desta versão:** distribuição dos rendimentos. Nesta versão o rendimento é registrado e fica **acumulado, sem destinação**. O estado de saída do fluxo é "rendimento acumulado", à espera da 2ª versão, que exigirá autorização formal registrada (RN-011).

### 4.2 Diagrama (ciclo de um lançamento)

```mermaid
stateDiagram-v2
    [*] --> Registrado: lançamento manual
    [*] --> Importado: extrato importado ou banco, se Q-02 incluir
    Importado --> AClassificar: sem rubrica
    AClassificar --> Registrado: líder classifica a rubrica
    Importado --> Registrado: já chegou com rubrica
    Importado --> Ignorado: já existia, importação repetida
    Registrado --> Estornado: correção com motivo
    Registrado --> Corrigido: nova versão com motivo
    Corrigido --> Registrado: nova versão passa a valer
    Estornado --> [*]: original mantido, nada é apagado
    Registrado --> [*]: compõe os saldos

    note right of Registrado
        Rendimento registrado fica acumulado,
        sem destinação na 1ª versão, e nunca
        entra no saldo de rubrica (RN-011).
    end note
```

### 4.3 Passos

1. **Orçamento (RF-050).** O valor aprovado de cada classificação é a soma das linhas do plano com essa classificação. A plataforma mostra o percentual distribuído e avisa a diferença em reais se a soma das linhas não bater com o valor total do projeto (RF-001), ao salvar e ao dar o OK, sem impedir o salvamento (RN-025). Mudar o orçamento depois do OK é ajuste versionado (fluxo 9).
2. **Crédito.** Líder registra a parcela recebida (data, valor, descrição).
3. **Despesa.** Segue o fluxo 3. Aumenta o executado da linha e da classificação e reduz o saldo ao centavo (RF-051).
4. **Rendimento (RF-054).** Líder registra o rendimento de aplicação (data, valor). A tela "Rendimentos" mostra por mês e acumulado. O valor **não** entra no saldo de nenhuma rubrica (RN-011).
5. **Importação (RF-052, só se Q-02 incluir).** Cada linha do extrato vira lançamento com origem "extrato"; linhas repetidas são ignoradas; linhas sem rubrica ficam "a classificar" e entram nas pendências.
6. **Painel (RF-053).** Por rubrica: previsto, realizado, saldo (previsto menos realizado, estornos somam de volta, RN-010) e percentual executado; totais e saldo da conta.
7. **Correção (RN-020).** Sempre por estorno ou nova versão, com motivo; o original permanece.

O PRD não dá a fórmula do "saldo da conta" (RF-053). Este documento assume créditos mais rendimentos menos débitos `[SUPOSIÇÃO]`; ver seção 10, item D3.

### 4.4 Regras de negócio aplicadas

RN-009 (centavos), RN-010 (saldo da rubrica), RN-011 (rendimentos à parte), RN-020 (sem apagar), RN-022 (acesso), RNF-14 (zero diferença de centavos).

### 4.5 Evidências exigidas

- Despesa: nota fiscal e comprovantes (fluxo 3).
- Crédito: não há evidência obrigatória no PRD; anexar o comprovante do crédito é possível pelo mesmo mecanismo de anexos `[SUPOSIÇÃO]`.
- Rendimento: idem, extrato ou informe da aplicação como anexo opcional `[SUPOSIÇÃO]`.
- Estorno ou nova versão: motivo obrigatório (RN-020).
- Importação: arquivo de extrato guardado com hash (RNF-12), se Q-02 incluir.

### 4.6 Eventos de auditoria

| Evento | Quando | Origem |
|---|---|---|
| `lancamento.criado` (tipo, valor, rubrica, origem) | Cada débito, crédito e rendimento | RF-112, RF-051 |
| `lancamento.estornado` e `lancamento.corrigido` (valor anterior e novo, motivo) | Correção | RF-112, RN-020 |
| `lancamento.classificado` | Rubrica atribuída a lançamento importado | proposto |
| `extrato.importado` (quantidade criada e ignorada) | Importação | proposto, só se Q-02 incluir |
| `orcamento.alterado` `[REMOVIDO v0.2]` | Substituído pelos eventos `linha_base.*` e `ajuste.*` (fluxos 8 e 9); o orçamento é derivado das linhas | cadastro separado deixou de existir (RF-050) |

### 4.7 Notificações

| Quem | O quê | Canal |
|---|---|---|
| Líder | Classificação ou linha com saldo negativo; lançamentos "a classificar"; soma das linhas diferente do valor total do projeto (RF-050, RF-052, RF-053, RN-025) | Painel e pendências |
| Líder | Despesa sem nota fiscal há mais de 30 dias (RF-055) | Painel e pendências |
| Líder | Lembrete mensal para registrar o rendimento | Não previsto no PRD; só faz sentido se Q-02 for lançamento manual. Pergunta na seção 10, item D6 |

### 4.8 Caminhos de exceção

- **Extrato importado duas vezes:** nenhuma duplicidade (RF-052).
- **Valor fracionado:** sem perda de centavos em nenhuma tela ou exportação (RF-050, RN-009, RNF-14).
- **Rubrica com saldo negativo:** destaque e pendência; o lançamento **não** é impedido (RN-012, RF-053).
- **Membro (registra) tenta lançar crédito ou rendimento:** recusado conforme a matriz, ou permitido se Q-09 mudar.
- **Membro (visualiza):** recusado em qualquer escrita.
- **Lançamento em projeto encerrado:** recusado (RF-004).
- **Tentativa de usar rendimento como saldo de rubrica:** não existe caminho; é a 2ª versão e exigirá autorização formal registrada (RN-011).
- **Tentativa de apagar lançamento:** não existe; só estorno (RN-020).
- **Falha parcial na importação:** nada é gravado pela metade; relatório de linhas rejeitadas `[SUPOSIÇÃO]`, só se Q-02 incluir importação.
- **Lançamento com data fora da vigência:** o PRD não define. Ver seção 10, item D7.
- **Mesmo valor, estornado e relançado:** os dois ficam no extrato do projeto, com origem e motivo.

### 4.9 Rastreio

RF-050 a RF-055, RF-053, RF-054, RF-112 · RN-009, RN-010, RN-011, RN-012, RN-020 · RNF-14 · Q-02, Q-09.

---

## 5. Avaliação TRL/MRL

### 5.1 Gatilho e atores

- **Gatilho:** o líder define a tecnologia avaliada, o nível de partida e a meta (RF-070); depois, a qualquer momento, o líder pede uma proposta de nível (RF-072).
- **Atores:** Líder (define, pede a proposta, confirma o nível oficial); Membro (registra) (anexa evidências e as liga a critérios, RF-071); Sistema (calcula a proposta por regra); IA (opcionalmente cita as evidências de cada critério, sempre rotulada); Membro (visualiza) (lê).
- **A IA propõe, a pessoa confirma:** a proposta **não é** nível oficial. Só o líder registra o oficial (RN-016, RF-073).
- **Diferença em relação à skill:** a skill descreve "autoavaliação, revisão por avaliador, registro". No PRD não há persona avaliador; o "avaliador" do histórico (RF-074) é o líder que confirma. Ver seção 10, item D8.
- **Escala depende de Q-03 (T-019):** níveis e critérios são configuração. Nada neste fluxo fixa a escala.

### 5.2 Diagrama (ciclo de uma avaliação, vale para TRL e para MRL)

```mermaid
stateDiagram-v2
    [*] --> SemEscala: escala ainda não configurada
    SemEscala --> Configurada: escala definida (Q-03)
    [*] --> Configurada: escala já disponível
    Configurada --> ComEvidencias: membro ou líder liga evidências a critérios
    ComEvidencias --> ComEvidencias: novas evidências ligadas
    ComEvidencias --> PropostaGerada: líder pede a proposta
    Configurada --> PropostaGerada: líder pede a proposta sem evidências
    PropostaGerada --> Confirmada: líder confirma o nível proposto
    PropostaGerada --> ConfirmadaComAjuste: líder registra outro nível com justificativa
    PropostaGerada --> Descartada: líder não aceita e não registra
    Descartada --> ComEvidencias: reunir mais evidências
    Confirmada --> Historico: nível oficial registrado
    ConfirmadaComAjuste --> Historico: nível oficial registrado
    Historico --> ComEvidencias: nova rodada de avaliação
    Historico --> [*]

    note right of PropostaGerada
        Rotulada proposta, e sugestão da IA
        quando houver IA. Não altera o nível oficial.
    end note
    note right of Historico
        Guarda nível, data, líder, proposta
        e evidências (RN-016).
    end note
```

### 5.3 Passos

1. **Definir (RF-070).** Líder registra a tecnologia ou produto, o nível TRL e MRL de partida e a meta. Cards mostram "TRL 3 → meta 5".
2. **Reunir evidências (RF-071).** Documentos, resultados, relatórios de ensaio e entregas de tarefas (RF-012) são ligados a um ou mais critérios de um nível. Cada ligação guarda autor e data.
3. **Pedir a proposta (RF-072).** O Sistema calcula o nível atual como o maior nível cujos critérios (e os dos níveis anteriores) têm evidência, e lista as lacunas do próximo nível. Se houver IA, ela também cita a evidência que justifica cada critério. A proposta é rotulada e não muda o nível oficial.
4. **Confirmar (RF-073, RN-016).** Líder aceita a proposta ou registra outro nível com justificativa obrigatória. O nível oficial guarda data, líder, evidências e a proposta original.
5. **Histórico e cards (RF-074).** Todas as avaliações oficiais em ordem de data, cada uma com suas evidências; cards com nível atual × meta no painel.

O cálculo do passo 3 é o do PRD (RF-072: "critérios com evidência"); a regra "maior nível sem lacunas abaixo" é a leitura mais simples `[SUPOSIÇÃO]` e deve ser fixada na skill `trl-mrl` (T-018) e na SPEC.

### 5.4 Regras de negócio aplicadas

RN-014 (IA sugere, pessoa decide), RN-015 (documentos são dados), RN-016 (só o líder registra o oficial; evidências guardadas; justificativa se divergir), RN-022 (acesso só ao projeto, importante porque a evidência pode ser sigilosa).

### 5.5 Evidências exigidas

- **Cada critério atendido:** pelo menos uma evidência ligada, com autor e data (RF-071).
- **Nível oficial:** guarda as evidências que o sustentam (RN-016). Evidência ligada depois não altera uma avaliação já confirmada; vale na próxima rodada.
- **Divergência da proposta:** justificativa escrita (RN-016, RF-073).
- **Sigilo:** evidência só abre para quem tem acesso ao projeto (RF-071).

### 5.6 Eventos de auditoria

| Evento | Quando | Origem |
|---|---|---|
| `trl_mrl.nivel_oficial_registrado` (nível, proposta original, justificativa, evidências, líder) | Confirmação | RF-112, RN-016 |
| `sugestao_ia.aceita` | Se a proposta teve IA e o líder aceitou | RF-112, RF-090 |
| `trl_mrl.proposta_gerada` (método: regra ou IA) | Pedido de proposta | proposto |
| `evidencia.ligada` e `evidencia.desligada` | Liga ou remove evidência de critério | proposto |
| `trl_mrl.meta_alterada` | Meta ou nível de partida | proposto |

### 5.7 Notificações

| Quem | O quê | Canal |
|---|---|---|
| Líder | Data da última avaliação e do último nível oficial no painel; aviso quando o plano ficou sem atualização (RF-024) | Painel |
| Líder | Lembrete periódico de avaliação | Não previsto no PRD. Pergunta na seção 10, item D6 |
| Líder | Lacunas do próximo nível listadas na tela da proposta | Na plataforma |

### 5.8 Caminhos de exceção

- **Escala não configurada (Q-03 em aberto):** o fluxo para em "sem escala"; a tela explica e nenhuma proposta é gerada.
- **Sem nenhuma evidência:** a proposta diz que nenhum critério tem evidência e lista os primeiros critérios faltantes; o líder pode ainda registrar um nível oficial com justificativa `[SUPOSIÇÃO]`.
- **Provedor de IA indisponível:** a proposta por regra continua; só a explicação por IA some, com aviso (RF-072, RF-091).
- **IA cita evidência que não existe:** proibido; toda citação aponta para uma evidência ligada (RF-072, RF-090).
- **Documento com instrução embutida:** tratado como dado (RN-015).
- **Membro tenta registrar nível oficial:** ação indisponível (RF-073).
- **Usuário sem acesso abre a evidência:** acesso negado (RF-071).
- **Líder registra nível menor que o anterior:** permitido com justificativa `[SUPOSIÇÃO]`; o histórico preserva os dois.
- **Escala mudada depois de avaliações oficiais:** cada avaliação guarda a versão da escala usada; o histórico não é reescrito `[SUPOSIÇÃO]`.
- **Projeto encerrado:** somente leitura (RF-004).
- **Nível oficial só com TRL ou só com MRL:** as duas trilhas podem ser confirmadas separadamente. O PRD não diz se uma avaliação precisa dos dois níveis juntos; ver seção 10, item D9.

### 5.9 Rastreio

RF-012, RF-024, RF-070 a RF-074, RF-090, RF-091 · RN-014, RN-015, RN-016, RN-022 · Q-03.

---

## 6. Entrada e saída de membros pelo líder

### 6.1 Gatilho e atores

- **Gatilho de entrada:** o líder convida uma pessoa por e-mail (RF-030). **Gatilho de saída:** o líder revoga o acesso (RF-032).
- **Atores:** Líder (único que convida, altera nível e revoga; RN-002); Convidado/Membro (aceita, usa); Sistema (valida, expira convite, invalida sessão).
- **Quem não entra por aqui:** o Pagador não é membro e não ganha acesso ao projeto ao pagar (RN-019).
- **Diferença em relação à skill:** a skill menciona "termo de compromisso". O PRD não prevê esse termo; ver seção 10, item D10.

### 6.2 Diagrama

```mermaid
stateDiagram-v2
    [*] --> Convidado: líder convida com nível registra ou visualiza
    Convidado --> Ativo: convidado cria conta ou entra e aceita
    Convidado --> ConviteExpirado: 7 dias sem aceite
    ConviteExpirado --> Convidado: líder reenvia
    Convidado --> ConviteCancelado: líder cancela o convite
    Ativo --> Ativo: líder altera o nível
    Ativo --> Revogado: líder revoga
    Revogado --> Convidado: líder convida de novo
    ConviteCancelado --> [*]
    Revogado --> [*]: acesso encerrado, registros mantidos com o nome

    note right of Revogado
        Em até 60 segundos nenhuma leitura
        nem escrita, mesmo com sessão aberta.
    end note
    note right of ConviteExpirado
        7 dias é SUPOSIÇÃO do PRD.
    end note
```

### 6.3 Passos de entrada

1. Líder informa e-mail e nível (registra ou visualiza) e envia o convite (RF-030). O líder precisa ter MFA (RF-111).
2. Sistema envia e-mail com link de uso único. O convite fica "convidado" por 7 dias `[SUPOSIÇÃO]`.
3. A pessoa abre o link; se não tem conta, cadastra e confirma o e-mail (RF-110); se já tem, entra. Aceita o convite. O e-mail da conta precisa ser o do convite `[SUPOSIÇÃO]`.
4. Passa a ver **só esse projeto**, com o nível escolhido (RF-030, RF-033). A lista da equipe mostra nome, nível e data de entrada a todos; só o líder vê os botões de alterar e revogar (RF-034).

### 6.4 Passos de saída e mudança de nível

- **Alterar nível (RF-031):** de "registra" para "visualiza", por exemplo. A próxima escrita do membro é recusada.
- **Revogar (RF-032):** em até 60 segundos o membro não lê nem escreve (RN-002, RNF-05); sessão aberta, endereços diretos, buscas e arquivos anexados deixam de responder. Os registros que ele fez continuam no projeto, com o nome dele.
- **Pendências do membro que saiu:** tarefas dele ficam "sem responsável ativo" para o líder reatribuir `[SUPOSIÇÃO]` (fluxo 2). Checagens, despesas e evidências dele permanecem.
- **Reentrada:** novo convite; o histórico da pessoa no projeto continua ligado ao mesmo usuário `[SUPOSIÇÃO]`.

### 6.5 Regras de negócio aplicadas

RN-001 (um líder só; o líder não é revogável por este fluxo), RN-002 (só o líder concede, altera e revoga; 60 s), RN-003 (dois níveis, Q-09), RN-020 (nada apagado), RN-022 (acesso só a quem é do projeto), RF-033 (isolamento).

### 6.6 Evidências exigidas

Nenhuma evidência documental no PRD. O próprio registro de auditoria é a evidência de quem convidou, aceitou, alterou e revogou, e quando.

### 6.7 Eventos de auditoria

| Evento | Quando | Origem |
|---|---|---|
| `convite.enviado` (e-mail, nível, líder) | Convite | RF-112 (convites) |
| `convite.aceito`, `convite.expirado`, `convite.cancelado` | Desfecho do convite | RF-112 (convites) |
| `membro.nivel_alterado` (anterior e novo) | Mudança de nível | RF-112 (mudanças de permissão) |
| `membro.revogado` (e momento em que as sessões foram invalidadas) | Revogação | RF-112 (revogações) |

### 6.8 Notificações

| Quem | O quê | Canal e antecedência |
|---|---|---|
| Convidado | Convite com link | E-mail (RF-030) |
| Líder | Convite aceito ou expirado `[SUPOSIÇÃO]` | Na plataforma |
| Membro | Mudança de nível ou revogação `[SUPOSIÇÃO]` | E-mail; o PRD não diz; decisão de privacidade com o `seguranca` |
| Líder | Tarefas sem responsável ativo depois da revogação | Pendência no painel `[SUPOSIÇÃO]` |

### 6.9 Caminhos de exceção

- **Convite não aceito em 7 dias:** expirado; o líder reenvia (RF-030).
- **Membro (não líder) tenta convidar, alterar ou revogar:** ação indisponível (RF-030, RN-002).
- **Convidado já é membro ativo do projeto:** convite recusado com aviso `[SUPOSIÇÃO]`.
- **Revogação durante gravação em andamento** (por exemplo, checagem sendo preenchida): a gravação é recusada depois da revogação; o rascunho não é salvo `[SUPOSIÇÃO]`.
- **Líder quer sair do projeto:** não há fluxo na 1ª versão. A transferência de liderança é RF-114 (Could); sem ela, o projeto não troca de líder. Ver seção 10, item D11.
- **Revogar o próprio líder:** impossível (RN-001).
- **Membro de A tenta ver B:** nada retornado (RF-033).
- **Líder sem MFA configurado:** a plataforma exige configurar antes de abrir permissões (RF-111).
- **Capacidade:** a 1ª versão é dimensionada para 20 membros por projeto (RNF-13); o PRD não impõe limite rígido (seção 8).
- **Projeto encerrado ou assinatura suspensa:** convidar e alterar nível seguem o efeito de T-802 (fluxo 7); em encerrado, somente leitura.
- **Quem aprova:** não há aprovação de entrada além do aceite do convidado. O convite não tem aprovador adicional.

### 6.10 Rastreio

RF-030 a RF-034, RF-110, RF-111, RF-112, RF-114 · RN-001, RN-002, RN-003, RN-019, RN-022 · RNF-05 · Q-09.

---

## 7. Assinatura por projeto

### 7.1 Gatilho e atores

- **Gatilho:** o líder contrata a assinatura do projeto (RF-100). R$ 50,00 por mês, por projeto (RN-017).
- **Atores:** Líder (contrata, indica o pagador, cancela, vê a situação); Pagador (qualquer PF ou PJ, paga e recebe comprovante; não acessa o projeto, RN-019); Provedor de pagamento (confirma o pagamento por aviso autenticado, RNF-10); Sistema (aplica o efeito de cada situação, RF-104).
- **Situações do PRD (RF-103):** em teste, ativa, aguardando pagamento, em atraso, cancelada. A situação **encerrada** (projeto encerrado) não consta no RF-103; é acrescentada aqui porque o pedido da T-015 e o RF-104 mencionam o efeito do encerramento. Ver seção 10, item D12.
- **Efeito de cada situação é configuração (T-802), não regra fixa** (RF-104, RN-018): período de teste, atraso, cancelamento e encerramento. Provedor, meios e nota fiscal dependem de Q-04 (T-801).

### 7.2 Diagrama

```mermaid
stateDiagram-v2
    [*] --> SemAssinatura: projeto criado
    SemAssinatura --> EmTeste: líder contrata e Q-05 define período de teste
    SemAssinatura --> AguardandoPagamento: líder contrata e não há teste
    EmTeste --> AguardandoPagamento: termina o teste
    EmTeste --> Cancelada: líder cancela
    AguardandoPagamento --> Ativa: pagamento confirmado pelo provedor
    AguardandoPagamento --> EmAtraso: passa o vencimento sem pagamento
    Ativa --> AguardandoPagamento: cobrança do mês seguinte gerada
    EmAtraso --> Ativa: pagamento confirmado
    Ativa --> Cancelada: líder cancela
    AguardandoPagamento --> Cancelada: líder cancela
    EmAtraso --> Cancelada: líder cancela
    Cancelada --> AguardandoPagamento: líder contrata de novo
    Ativa --> Encerrada: projeto encerrado
    Cancelada --> Encerrada: projeto encerrado
    EmAtraso --> Encerrada: projeto encerrado
    AguardandoPagamento --> Encerrada: projeto encerrado
    EmTeste --> Encerrada: projeto encerrado
    Encerrada --> [*]: sem novas cobranças, conforme Q-17 e Q-05

    note right of EmAtraso
        Efeito sobre o projeto depende de Q-05.
        Nenhum dado é apagado por atraso.
        Pagamento confirmado volta ao normal
        sem perda de dados (RF-104).
    end note
    note right of Encerrada
        Cobrança após o fim da vigência
        depende de Q-17.
    end note
    note right of Cancelada
        Efeito do cancelamento e prazo para
        exportar os dados dependem de Q-05.
    end note
```

### 7.3 Passos

1. **Contratar (RF-100).** Líder escolhe o pagador: ele mesmo ou um patrocinador (nome, CPF ou CNPJ, e-mail). Gera-se a cobrança de R$ 50,00; situação "aguardando pagamento" (ou "em teste", se Q-05 definir).
2. **Enviar a cobrança (RF-101).** O pagador recebe por e-mail ou link enviado pelo líder. Vê só título do projeto, valor, vencimento e meios de pagamento (se Q-18 permitir mais, muda só o que ele vê, não o fluxo). O pagamento ocorre no ambiente do provedor; nenhum dado de cartão passa pela plataforma (RNF-10).
3. **Confirmar o pagamento.** O provedor avisa; o aviso é autenticado e **idempotente**. A situação passa a "ativa" em até 5 minutos `[SUPOSIÇÃO]` do PRD; aviso repetido não gera segundo crédito (RF-101).
4. **Comprovante (RF-102).** Pagador e líder recebem comprovante (e nota fiscal, se Q-04 definir emissão).
5. **Ciclo mensal.** A cada mês, gera-se nova cobrança para o mesmo pagador; a situação volta a "aguardando pagamento" até a confirmação `[SUPOSIÇÃO]` sobre o desenho do ciclo.
6. **Atraso (RF-103, RF-104).** Cobrança vencida sem pagamento: "em atraso", aviso ao líder com link de pagamento; todos os membros veem o aviso; o projeto recebe exatamente o efeito de T-802.
7. **Regularização.** Pagamento do atraso confirmado: o projeto volta ao normal, sem perda de dados (RF-104).
8. **Cancelar (RF-105).** Só o líder. Não há novas cobranças; o projeto segue a regra de T-802 para cancelamento. Membro e pagador não veem a ação.
9. **Encerrar o projeto (fluxo 1).** A assinatura passa a "encerrada" e o efeito segue T-802; a exportação (RF-106) continua disponível pelo prazo de T-802.

### 7.4 Efeito por situação (configurável, sem decisão neste documento)

| Situação | Efeito no projeto | Definido em |
|---|---|---|
| Em teste | Funcionalidades completas ou limitadas; duração do teste | Q-05 (T-802) |
| Ativa | Todas as funcionalidades da 1ª versão (seção 8 do PRD) | PRD |
| Aguardando pagamento | Sem efeito restritivo `[SUPOSIÇÃO]`; o líder vê o aviso de vencimento | PRD (RF-103) |
| Em atraso | Efeito configurável, por exemplo somente leitura; não apaga dados | Q-05 (T-802), RN-018 |
| Cancelada | Efeito configurável e prazo para exportar | Q-05 (T-802), RF-105, RF-106 |
| Encerrada | Efeito configurável; cobrança depois da vigência | Q-05, Q-17 |

O mesmo mecanismo serve a qualquer opção: o projeto pergunta à assinatura "qual efeito vale agora" e o aplica por configuração. O estado "Suspenso" do fluxo 1 é a tradução desse efeito quando ele é restritivo.

### 7.5 Regras de negócio aplicadas

RN-017 (R$ 50,00 por mês por projeto; qualquer PF ou PJ; mesma funcionalidade e preço), RN-018 (efeito configurável; atraso não apaga dados), RN-019 (pagador só vê a cobrança), RN-020 (nada apagado). RNF-10 (sem dados de cartão).

### 7.6 Evidências exigidas

- **Pagamento:** confirmação autenticada do provedor, guardada com identificador da transação (para impedir duplicidade) `[SUPOSIÇÃO]` sobre o campo.
- **Comprovante:** emitido após cada pagamento (RF-102).
- **Pagamento da assinatura com recurso do projeto:** se o edital permitir (Q-16), a despesa da assinatura entra no fluxo 3 como qualquer outra, com checagem, e precisa de nota fiscal (depende de Q-04). Se o edital não permitir, a regra de item vedado bloqueia, como em qualquer item.

### 7.7 Eventos de auditoria

Todos são "eventos de assinatura" (RF-112).

| Evento | Quando |
|---|---|
| `assinatura.contratada` (pagador, valor) | Contratação |
| `assinatura.pagador_alterado` | Troca de pagador (ver seção 7.9) |
| `assinatura.cobranca_gerada` | Cada cobrança |
| `assinatura.pagamento_confirmado` (identificador do provedor) | Confirmação; repetições são registradas como ignoradas |
| `assinatura.atrasada` | Passou o vencimento |
| `assinatura.regularizada` | Pago depois do atraso |
| `assinatura.cancelada` (líder) | Cancelamento |
| `assinatura.encerrada` | Projeto encerrado |
| `assinatura.efeito_aplicado` e `assinatura.efeito_removido` | Efeito de T-802 aplicado ou retirado do projeto |

### 7.8 Notificações

| Quem | O quê | Canal e antecedência |
|---|---|---|
| Pagador | Cobrança com valor, vencimento e meios (RF-101) | E-mail ou link enviado pelo líder |
| Pagador | Lembrete antes do vencimento | Não definido no PRD; antecedência a definir com Q-04 |
| Pagador e líder | Comprovante (RF-102) | E-mail e tela |
| Líder | Aviso de atraso com link de pagamento (RF-103) | Na plataforma, e e-mail `[SUPOSIÇÃO]` |
| Todos os membros | Aviso de atraso e efeito aplicado (RF-104) | Na plataforma |
| Líder | Cancelamento registrado; efeito e prazo de exportação | Na plataforma |

### 7.9 Caminhos de exceção

- **Aviso de pagamento repetido:** não gera segundo crédito (RF-101).
- **Aviso de pagamento perdido ou atrasado:** a situação só muda com a confirmação; a plataforma consulta o provedor periodicamente `[SUPOSIÇÃO]`; definir na SPEC com Q-04.
- **Pagamento confirmado depois do cancelamento:** não reativa a assinatura; o tratamento (estorno) é decisão em Q-04 e Q-05, não prevista no PRD.
- **Membro ou pagador tenta cancelar:** ação indisponível (RF-105).
- **Pagador abre a cobrança:** vê só a cobrança; nenhum dado do projeto (RF-101, RN-019).
- **Dois projetos do mesmo líder:** duas assinaturas independentes (RF-100).
- **Pagador PF ou PJ:** tratados igual (RF-100).
- **Troca de pagador no meio do contrato:** o PRD não trata. Fluxo proposto: o líder altera o pagador e vale a partir da próxima cobrança, com auditoria `[SUPOSIÇÃO]`.
- **Reativar depois de cancelar:** nova contratação (RF-100 trata "projeto sem assinatura") `[SUPOSIÇÃO]`.
- **Atraso longo:** o PRD não define cancelamento automático. Se Q-05 definir, entra como transição de "em atraso" para "cancelada" por prazo; senão, a assinatura fica em atraso até o líder agir.
- **Provedor de pagamento indisponível:** o projeto **não** é bloqueado por falta de confirmação; a situação só muda com evidência do provedor (risco do PRD, seção 9).
- **Dados do pagador:** CPF/CNPJ e e-mail só ao líder do projeto e ao pagador (RF-100).
- **Exportar dados:** disponível ao líder (RF-106), com prazo após o fim da assinatura em T-802.

### 7.10 Rastreio

RF-100 a RF-106, RF-112 · RN-017, RN-018, RN-019, RN-020 · RNF-10 · Q-04, Q-05, Q-16, Q-17, Q-18.

---

## 8. Decisões humanas que os fluxos exigem (responsável e prazo)

A skill pede responsável e prazo em toda aprovação. O PRD não impõe prazo para decisões do líder; a plataforma mostra a pendência no painel e não age por conta própria. Os únicos prazos do PRD estão destacados.

| Decisão | Responsável | Prazo | Se o prazo vencer |
|---|---|---|---|
| Confirmar regra do edital (RN-004) | Líder | Nenhum | Regra não confirmada não é usada; checagem avisa; aparece em pendências |
| Enquadrar item pendente (RF-066) | Líder | Nenhum | Checagem continua pendente |
| Superar bloqueio (RF-065, Q-10) | Líder | Nenhum | Bloqueio permanece |
| Confirmar nível TRL/MRL oficial (RF-073) | Líder | Nenhum | Segue o nível oficial anterior; proposta não vira oficial |
| Aceitar sugestão da IA (RF-090) | Pessoa com permissão | Nenhum | Sugestão não tem efeito |
| Aceitar convite | Convidado | 7 dias `[SUPOSIÇÃO]` | Convite expira; líder reenvia |
| Encerrar projeto (RF-004) | Líder | Nenhum; alerta de vigência em 90, 60 e 30 dias | Projeto fica em "vigência encerrada" |
| Pagar cobrança (RF-101) | Pagador | Vencimento da cobrança | Assinatura "em atraso"; efeito de T-802 |

Nenhuma transição que movimente dinheiro, envie documento externo ou aprove algo é feita só por agente (princípio da skill; RN-014).

---

## 9. Dependências de decisões em aberto (Q-xx) e como os fluxos se comportam

| Q | Decisão pendente | Fluxos afetados | Como o fluxo funciona com qualquer opção |
|---|---|---|---|
| Q-01 (T-011) | Entrada das regras do edital | 3 | Nas duas formas a regra nasce "rascunho" e só vale após o líder confirmar. A etapa "proposta da IA" só aparece se a decisão a incluir. |
| Q-02 (T-012) | Entrada dos dados da conta | 3, 4 | Todos os lançamentos usam o mesmo registro com origem anotada. Estados "importado", "a classificar" e "ignorado (repetido)" só existem se houver importação ou banco. |
| Q-03 (T-019) | Escala TRL/MRL | 5 | Escala é configuração. Sem escala, o fluxo para em "sem escala". |
| Q-04 (T-801) | Provedor, meios, nota fiscal | 7 | Confirmação por aviso autenticado e idempotente; meios e nota fiscal só mudam o texto do comprovante e o conteúdo da cobrança. |
| Q-05 (T-802) | Teste, atraso, cancelamento, encerramento, prazo de exportação | 1, 7 | O efeito é consultado em configuração; estados "em teste" e "suspenso" só têm efeito se a configuração os definir. |
| Q-09 | Níveis de membro e lançamento de crédito por membro | 4, 6 | A matriz de permissões é dado; mudar o nível de quem pode lançar crédito não altera o fluxo. |
| Q-10 | Superação de bloqueio | 3 | Se não existir, some a transição "bloqueio superado"; o resto não muda. |
| Q-11 | Cotações do mesmo fornecedor e validade | 3 | A verificação de cotações lê a regra; a contagem é parâmetro. |
| Q-12 | Retenção de dados após encerramento | 1 | Estado "encerrado" mantém os dados; o prazo é parâmetro. |
| Q-15 | Bloqueio fora da vigência | 1, 3 | A verificação 6 pode ser removida sem mudar o restante. |
| Q-16 | Assinatura paga com recurso do projeto | 3, 7 | Se permitida, a despesa da assinatura passa pelo fluxo 3. |
| Q-17 | Cobrança após fim da vigência | 1, 7 | Só muda se "encerrada" cobra ou não. |
| Q-18 | O que o pagador vê | 7 | Só muda o conteúdo da tela do pagador. |
| Q-19 | Reserva de saldo por checagem | 3 | A verificação de saldo ganha ou perde um termo. |
| Q-20 | Prazos de alerta | 1, 2 | Prazos são parâmetros. |

Também são parâmetros por edital (RN-007): rubricas, itens permitidos e vedados, faixas e quantidade de cotações, limites e validade da cotação.

---

## 10. Pontos de divergência e ambiguidade encontrados no PRD

Nenhum deles foi decidido neste documento. Cada um tem o tratamento provisório indicado.

| ID | Onde | Problema | Tratamento provisório |
|---|---|---|---|
| D1 | RF-004, RN-020 | Não diz se um projeto encerrado pode ser reaberto. | Sem reabertura. Sugestão: perguntar ao dono. |
| D2 | RN-012, RF-064 | RN-012 só prevê as marcas "sem checagem" e "comprada com checagem bloqueada". Despesa lançada com checagem **pendente** vinculada não tem marca. | Criada a marca "comprada com checagem pendente" `[SUPOSIÇÃO]`. |
| D3 | RF-053, RF-054, RN-011 | "Saldo da conta" não tem fórmula. Rendimento não entra em rubrica, mas entra ou não no saldo da conta? | Assumido créditos mais rendimentos menos débitos. |
| D4 | RF-012 | Matriz permite ao membro "registra" editar o plano em geral; RF-012 fala em tarefas "sob sua responsabilidade". Também não torna o anexo da entrega obrigatório. | Membro registra edita itens do plano; só o responsável conclui `[SUPOSIÇÃO]`. Anexo obrigatório quando há entrega esperada. |
| D5 | RF-041, RN-004 | Uma regra "sem fonte" pode ser confirmada? | Pode, ficando marcada e em pendências. |
| D6 | RF-013, RF-024 | Lembretes de rendimento mensal e de nova avaliação TRL/MRL não existem; só o aviso de plano sem atualização há mais de 30 dias. | Não incluídos como requisito; apenas indicados. |
| D7 | RN-024, RF-051 | Só a checagem trata a vigência. Um lançamento com data fora da vigência não tem regra. | Aceito, com aviso `[SUPOSIÇÃO]`. |
| D8 | skill workflow-builder × RF-072 a RF-074 | A skill descreve revisão por avaliador; o PRD tem só o líder. | Avaliador é o líder. |
| D9 | RF-073 | Uma avaliação oficial deve ter TRL e MRL juntos ou cada um pode ser confirmado separado? Nível de partida (RF-070) conta como avaliação oficial? | Trilhas separadas; partida é nível declarado, não oficial. |
| D10 | skill workflow-builder × RF-030 | A skill cita "termo de compromisso"; o PRD não. | Não incluído. |
| D11 | RF-114 (Could), RN-001 | Se o líder sair, o projeto não tem como trocar de líder sem RF-114. | Sem fluxo de saída do líder. Sugestão: subir RF-114 para Should ou aceitar o risco. |
| D12 | RF-103, T-015 | A lista de situações do RF-103 não tem "encerrada". Os efeitos do encerramento são citados em RF-104 e T-802. | Situação "encerrada" adicionada. |
| D13 | RF-112 | A lista de eventos obrigatórios não cobre ciclo do projeto, plano de trabalho, orçamento, evidências e comprovantes. | Eventos propostos marcados como tais; `seguranca` decide. |
| D14 | RF-020 | RF-020 não diz quem muda a fase ISO nem o que a fase condiciona. | Líder muda; não condiciona nada. |
| D15 | Briefing × skill | A skill lista remanejamento entre rubricas e prestação de contas como fluxos mínimos; o PRD os deixa para a 2ª versão ou os marca a confirmar. | Não modelados aqui. |
| D16 | RF-064 | Uma checagem feita depois da compra vale como "prévia" para a meta O3? | Só vale se a checagem for anterior à data da compra `[SUPOSIÇÃO]`. |
| D17 | RF-030, RF-032 | Convite recusado e convite cancelado pelo líder não existem no PRD; notificação ao membro sobre a mudança de nível ou revogação também não. | Incluídos como suposição. |

---

## 11. Catálogo consolidado de eventos de auditoria (para alinhamento com docs/06-seguranca.md)

| Domínio | Eventos | Fluxo |
|---|---|---|
| projeto | criado, vigencia_alterada, suspenso, retomado, encerrado | 1 |
| documento | anexado | 1, 3 |
| plano e tarefa | item_criado, item_alterado, tarefa.concluida, tarefa.atrasada, marco.criado, marco.alterado | 2 |
| regra | criada, nova_versao, confirmada, desativada | 3 |
| checagem | registrada, bloqueio_superado | 3 |
| sugestão de IA | aceita, descartada | 3, 5 |
| despesa | lancada, marcada_sem_checagem, marcada_bloqueada, estornada, corrigida | 3 |
| comprovante | anexado | 3 |
| lançamento | criado, estornado, corrigido, classificado | 4 |
| extrato | importado | 4 |
| orçamento | alterado | 4 |
| trl_mrl | nivel_oficial_registrado, proposta_gerada, meta_alterada | 5 |
| evidência | ligada, desligada | 5 |
| convite e membro | convite.enviado, aceito, expirado, cancelado; membro.nivel_alterado, revogado | 6 |
| assinatura | contratada, pagador_alterado, cobranca_gerada, pagamento_confirmado, atrasada, regularizada, cancelada, encerrada, efeito_aplicado, efeito_removido | 7 |

---

## 12. Lista de verificação da skill workflow-builder (modo processo)

- [x] Todo fluxo tem estados finais e caminho de exceção (recusa, prazo vencido, cancelamento): seções 1.8, 2.8, 3.13, 4.8, 5.8, 6.9, 7.9; estados finais nos diagramas.
- [x] Toda aprovação tem responsável e prazo: seção 8. O PRD não impõe prazo para decisões do líder; isto está declarado.
- [x] Fluxos financeiros geram auditoria e exigem comprovante: seções 3.10, 3.11, 4.5, 4.6 e 7.6, 7.7.
- [ ] Backlog cobre todos os RF Must: item do modo backlog, fora do escopo da T-015.
- [ ] Próximo passo indicado: `agent-skill-builder`. O PRD já cita T-018 (skills de domínio) como etapa seguinte; os fluxos 3, 5 e 7 alimentam as skills `checagem-pre-compra`, `trl-mrl` e `assinatura-por-projeto`.

## Próximo passo

1. Dono revisa este documento junto com as perguntas da seção 10 e as dependências da seção 9.
2. `seguranca` valida o catálogo de eventos da seção 11 em `docs/06-seguranca.md`.
3. `designer` usa os estados e as mensagens destes fluxos no mapa de telas (`docs/03-ux.md`).
4. T-018: criar as skills de domínio a partir dos fluxos 3, 5 e 7 (`agent-skill-builder`).
