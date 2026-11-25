# ADR-0010: Escala TRL e MRL configurável

Status: proposto · Data: 2026-11-25 · SPEC: seções 3.3.9 e 4.4 (H) · RF-070 a RF-074, RN-016, RN-052, Q-37

## Contexto

O dono decidiu TRL de 1 a 9 (referência ISO 16290) e MRL de 1 a 10 (escala de 10 níveis do DoD). Os textos oficiais dos critérios **não foram conferidos**: ficam "a validar" até o dono enviar o documento ou aprovar o texto obtido pelo analista. A escala por financiador fica para a camada seguinte.

## Opções

1. Níveis e critérios no código (qualquer correção exige nova versão do produto).
2. **Escala como dado versionado**: níveis e critérios em tabelas, cada critério com situação `a_validar` ou `validado` (escolhida).
3. Escala por financiador já na 1ª versão (fora do escopo aprovado).

## Decisão

Tabelas `escala` (tipo, versão, `nivel_min`, `nivel_max`, referência em texto, `financiador_id` nulo para a escala padrão), `escala_nivel` e `escala_criterio` (texto, situação, fonte, quem validou e quando; nova versão ao validar). O banco recusa nível fora da escala. A interface mostra "critério a validar" em cada critério não validado e **nunca** apresenta o texto como oficial. A proposta de nível é calculada **por regra** (maior nível cujos critérios, e os dos níveis abaixo, têm evidência ligada), lista as lacunas do nível seguinte e leva o aviso "baseada em critérios ainda a validar"; não é nível oficial. Só o líder, com MFA recente, confirma o nível oficial, com justificativa se divergir. Avaliações oficiais são somente inserção e guardam a versão da escala usada. Os dados iniciais trazem **títulos de nível e critérios de redação própria, todos `a_validar`**, sem copiar texto de norma ou manual. A validação de critério é ato da operação (`escala.criterio_alterado`).

## Consequências

- Trocar de "a validar" para "validado", ou ajustar um critério, é dado, não código.
- A escala por financiador entra depois com `financiador_id` preenchido, sem mudar o modelo.
- Há uma divergência de texto no PRD (introdução de 5.8 × RF-072) sobre propor ou não quando nada está validado; a SPEC segue o RF-072 (SPEC 11.1, V1).
