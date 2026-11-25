# ADR-0013: Criptografia por campo, HMAC e gestão de chaves

Status: proposto · Data: 2026-11-25 · SPEC: seção 4.10 e 9.6 · SEG-062, SEG-063, SEG-144, SEG-247, SEG-248

## Contexto

Além da criptografia em repouso do banco e do armazenamento, o `06` exige cifra por campo para CPF e CNPJ de pagador e de fornecedor, segredo de MFA e dados bancários do extrato (número da conta, agência), com HMAC para comparar sem decifrar, e chaves distintas por finalidade. A descrição do lançamento do extrato precisa ser lida pela conciliação.

## Opções

1. Cifra no banco (funções do Postgres ou do cofre do banco): quem administra o banco enxerga as chaves e o claro.
2. **Cifra de aplicação (AES-GCM por campo) com chaves fora do banco**, e HMAC separado (escolhida).
3. Cifrar tudo, inclusive a descrição do extrato: impede a sugestão de conciliação em SQL e complica a busca.

## Decisão

- `CifraPort` implementada por cifra de aplicação com `key_version` na coluna; **famílias de chave distintas** (dados de pagador, dados de fornecedor, dados bancários; HMAC de documento e de conta; assinatura de URLs), por ambiente, em cofre ou variáveis do provedor, com rotação (recifrar em job).
- Colunas `*_cifrado` (bytea) e `*_hmac` (bytea): comparação e unicidade por HMAC; exibição por máscara (4 últimos dígitos, CPF e CNPJ parciais).
- Arquivos de plano e extrato: **cifra de aplicação com chave por projeto**, envelopada pela chave mestra do ambiente; o SHA-256 é do original **em claro**, calculado antes de cifrar.
- **Sem cifra de campo** na descrição do lançamento (tratada por RLS só do líder, criptografia em repouso, mascaramento na saída, ausência em log e auditoria; risco residual no RIPD).
- Chaves têm **backup próprio e separado**, com custódia de duas pessoas: perder a chave mestra é perder os originais cifrados.
- Nenhum valor de chave no repositório, em log, em prompt ou em chat; apenas nomes de variáveis (SPEC 9.6).

## Consequências

- Um vazamento do banco não expõe CPF, CNPJ e dados de conta; um vazamento da aplicação expõe o que a aplicação decifra (limite de RLS e privilégios).
- Rotação exige recifrar dados e arquivos; precisa de job e de teste.
- Custódia e restauração de chaves entram no plano de backup (T-903).
