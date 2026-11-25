# ADR-0007: Extrato bancário (OFX e CSV) e conciliação

Status: proposto · Data: 2026-11-25 · SPEC: seções 3.3.6 a 3.3.8 e 7.5 · RF-052, RF-146 a RF-149, RN-039 a RN-042, RNF-22 a RNF-24, SEG-242 a SEG-263

## Contexto

O dono escolheu a importação do extrato (T-012 = b). O extrato traz dados bancários e de terceiros; é registro do banco e a despesa é registro da pessoa; a plataforma sugere a conciliação e a pessoa confirma. Os formatos de cada banco **não foram verificados** (Q-35).

## Opções

1. Guardar o extrato como anexo e conciliar à mão (sem ganho de controle).
2. **Leitura determinística com staging, promoção tudo-ou-nada, deduplicação no banco e conciliação humana par a par** (escolhida).
3. Usar IA para ler e conciliar (proibido: SEG-251).

## Decisão

- Só OFX 1.x/2.x e CSV, no leitor isolado: OFX sem DTD nem entidades externas; CSV por análise textual, números a centavos sem ponto flutuante, formatos por enumeração fechada, célula com `=`, `+`, `-`, `@` é texto.
- **Staging** efêmero (24 h) com pré-visualização `no-store` mostrando quantidade, soma de débitos, soma de créditos, período e erros. A promoção é uma função do banco chamada pelo líder com MFA recente, **tudo ou nada**, que confere que a soma dos lançamentos criados é idêntica à da pré-visualização e do arquivo, ao centavo.
- **Deduplicação no banco**: chave = identificador do banco mais HMAC da conta (ou hash de conta, data, valor e descrição normalizada com contador de ocorrência), `unique(projeto, conta, chave, ocorrência)`. Mesmo identificador com valor, data ou sinal diferentes **nunca sobrescreve**: vira divergência, pendência e alerta. Extrato de outra conta é recusado por padrão.
- `lancamento_extrato` é somente inserção, legível só pelo líder; membros leem por função com a descrição mascarada. Número de conta e agência cifrados por campo, exibidos pelos 4 últimos dígitos; "revelar" é ação auditada com MFA recente.
- **Conciliação**: sugestão por regras determinísticas no servidor (valor, janela de data, similaridade da descrição, combinações 1:N e N:1 de até 4 itens, motivos legíveis); confirmação **par a par** pelo líder, com checagem de mesmo projeto, nenhum estorno e soma que fecha ao centavo; desfazer exige motivo; histórico em tabelas somente inserção. Exceções e justificativas nunca se resolvem sozinhas.
- Rendimento: sugestão por termos configuráveis, vale só após o líder confirmar o tipo; nunca altera saldo de linha ou classificação; não existe rota de destinação.
- Auditoria com ids, hashes, somas e contagens, **um evento por lote**, nunca descrição, conta ou CPF.

## Consequências

- O mapeamento manual de CSV e o OFX cobrem qualquer banco; modelos por banco entram como configuração quando houver extratos anonimizados (T-306).
- A descrição do lançamento não é cifrada por campo (a conciliação precisa dela); o risco residual é tratado por RLS, mascaramento e RIPD.
- O líder confere o que ele mesmo lançou: limite conhecido, com controles compensatórios (extrato imutável, motivo obrigatório, trilha, pendências).
