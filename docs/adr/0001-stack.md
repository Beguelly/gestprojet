# ADR-0001: Stack da GestProjet

Status: proposto (aguarda a aprovação da SPEC, T-014) · Data: 2026-11-25 · SPEC: seções 1 e 2

## Contexto

O dono decidiu (T-010) por Next.js com TypeScript, Supabase (Postgres, Auth com MFA, Storage, RLS) e hospedagem na Vercel. O produto precisa de isolamento por projeto no banco, trilha de auditoria imutável, valores em centavos, arquivos com varredura e leitura isolada, e funcionar sem IA. O volume do MVP é pequeno (RNF-13): dezenas de projetos.

## Opções

1. **Next.js + Supabase + Vercel, mais um serviço de arquivos em contêiner** (decisão do dono, com o complemento).
2. Next.js + Postgres próprio + contêineres para tudo (mais controle, mais operação).
3. Backend em outra linguagem com front separado (dois idiomas, sem ganho para o MVP).

## Decisão

Opção 1, como **monólito modular em TypeScript estrito**: páginas e API REST `/api/v1` em Route Handlers (runtime Node) na Vercel; Postgres do Supabase como fonte de verdade com RLS, constraints, triggers e funções; Supabase Auth chamado por rotas próprias; Storage privado; e um **serviço de arquivos em contêiner** (worker, antimalware auto-hospedado, leitor isolado) porque SEG-207, SEG-215 e SEG-251 exigem varredura e leitura sem enviar o arquivo a terceiros e sem rede. Núcleo de domínio puro, portas e adaptadores para tudo externo (ADR-0005). Valores monetários em `bigint` centavos, moeda explícita, sem ponto flutuante.

## Consequências

- Um idioma, tipos compartilhados e domínio testável sem banco.
- Dependemos de características de Supabase e Vercel **não verificadas** (MFA e claims do Auth, duração de sessão, backup, limites de funções, parâmetros de bucket, pooler): ficam como "a conferir" e são fechadas em T-101 e T-109 (risco RT-09).
- Há três lugares para operar (Vercel, Supabase, contêiner); o terceiro tem custo próprio e precisa de aprovação do dono (T-115; risco RT-12).
- Sem filas externas, cache distribuído nem microsserviços; revisar só com motivo documentado.
