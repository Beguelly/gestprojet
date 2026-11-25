# ADR-0004: Linha de base imutável e versionada

Status: proposto · Data: 2026-11-25 · SPEC: seções 4.4 (E), 4.8 e 3.3 · RF-128, RF-129, RN-027, RN-028, SEG-228 a SEG-232, SEG-269

## Contexto

Depois do OK do líder, o plano (metas, etapas, linhas, classificações, valores) não pode ser reescrito; mudanças são ajustes versionados, e a execução já lançada continua ligada à versão da época. O dono decidiu que só o líder dá o OK e que o financiador só aprova ajustes, apenas registrados pela plataforma.

## Opções

1. Tabela única com histórico por coluna (`vigente`, datas): exige `UPDATE` em dados que devem ser imutáveis.
2. **Versões como instantâneos completos e imutáveis, mais um ponteiro único mutável para a versão vigente** (escolhida).
3. Eventos de mudança (event sourcing): reconstrução custosa para o painel e para a conferência.

## Decisão

- Identidades estáveis `plano_meta`, `plano_etapa`, `plano_linha` (uid) nunca apagadas; cada versão copia o conteúdo para `lb_classificacao`, `lb_meta`, `lb_etapa`, `lb_linha` (somente inserção).
- `linha_base_versao` (numeração sem lacuna por trigger e `unique(projeto_id, numero)`), `linha_base_selo` (hash do conteúdo e da versão anterior) e `linha_base_vigente(projeto_id primary key, versao_id)`: a chave primária garante **uma só versão vigente**; os ajustes simultâneos se serializam por `FOR UPDATE` no ponteiro (o segundo recebe `CONFLITO_VERSAO`).
- O OK e o ajuste vigente são funções do banco que **recalculam** validações impeditivas e conferência obrigatória, conferem o hash da minuta exibida, MFA recente e projeto gravável, selam a versão e gravam o evento com hashes e totais.
- A despesa guarda `linha_uid` (identidade) e `lb_linha_id` (a linha na versão da época). Linha com despesas **não pode ser removida** em nenhuma versão, só zerada (SEG-269). Ajuste pendente de aprovação externa não toca o ponteiro.
- Rotina diária e verificação na leitura recalculam os hashes; divergência bloqueia o uso da versão e alerta.

## Consequências

- Imutabilidade garantida por privilégio e trigger, não por disciplina da aplicação.
- Mais linhas armazenadas (uma cópia por versão): irrelevante no limite do RNF-18 (2.000 linhas).
- Não existe estado "linha de base aprovada pelo financiador" no modelo (RN-031, Q-27).
