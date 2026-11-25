# ADR-0009: Região e residência de dados

Status: proposto; a região é escolhida na T-101 · Data: 2026-11-25 · SPEC: seções 2 e 9.2 · RNF-25, SEG-089, SEG-272, Q-49

## Contexto

O dono respondeu que **não exige** dados em servidores no Brasil. A região será escolhida por latência e custo. Ressalvas registradas no PRD e no `06`: a LGPD tem regras de transferência internacional (a confirmar com jurídico, T-901), contratos de financiadores ou de instituições públicas podem impor residência (também ao processamento da IA), e a região deve ser trocável sem mudar o produto.

## Opções

1. Fixar uma região no código (rejeitada).
2. **Região como configuração de implantação**, registrada no inventário e visível ao líder (escolhida).
3. Seleção de região por cliente dentro do mesmo produto (fora da 1ª versão).

## Decisão

- Banco, funções da aplicação, armazenamento e serviço de arquivos ficam **na mesma região** em cada ambiente (homologação igual à produção); a região é parâmetro de implantação, nunca regra de negócio.
- Critério da T-101: menor latência para o Brasil entre as regiões oferecidas (RNF-03) dentro do custo aceito pelo dono; preferência a confirmar: a mais próxima do Brasil. As regiões e planos disponíveis são **a conferir** na documentação vigente.
- Registrar em `docs/06-seguranca.md` (2.1) a região e o país de cada categoria: hospedagem, armazenamento, backup, e-mail, pagamento e o **processamento da IA** (depende da forma de contratação, Q-24; tratar como transferência internacional até o contrato provar o contrário).
- A flag de leitura por IA pode ser desligada **por cliente ou por projeto** pela operação (restringe); isso atende o caso de um edital que proíba tratamento fora do país sem trocar a região dos demais.
- Se um edital exigir residência dos dados (Q-49), a resposta é uma **nova implantação** (outro projeto Supabase e outro serviço de arquivos na região exigida), com custo; o código não muda.

## Consequências

- Nada no domínio depende de região; o custo de atender uma exigência de residência é de operação, não de refatoração.
- Backups e cópias de arquivo não podem contradizer cláusula de residência de um cliente (QS-28).
- A decisão não dispensa a revisão jurídica da transferência internacional nem a leitura das cláusulas do cliente.
