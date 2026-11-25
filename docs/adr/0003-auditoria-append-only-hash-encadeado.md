# ADR-0003: Auditoria append-only com hash encadeado

Status: proposto · Data: 2026-11-25 · SPEC: seções 4.4 (M), 4.7 e 6 · SEG-100 a SEG-108, SEG-229, SEG-235

## Contexto

Ações sobre dinheiro, permissões, documentos e aprovações precisam de registro que ninguém altere ou apague, nem o líder, nem a operação. O `06` recomenda hash encadeado (SEG-100) e o exige para linha de base e ajustes (SEG-229). O registro deve entrar na mesma transação da operação (SEG-103).

## Opções

1. Tabela de eventos comum com permissões restritas (sem detecção de adulteração por quem tem acesso ao banco).
2. Tabela append-only com triggers e **hash encadeado por cadeia**, com verificação periódica e âncora externa (escolhida).
3. Serviço externo de log imutável (mais custo e outro fornecedor, sem ganho no MVP).

## Decisão

Tabela `auditoria.evento` somente inserção (privilégios revogados e trigger inclusive para `TRUNCATE`), escrita **só** pela função `private.registrar_evento`, chamada pela função de domínio ou por trigger genérico, na mesma transação. Uma **cadeia por escopo** (`projeto`, `tenant`, `usuario`, `plataforma`); o bloqueio da linha da cadeia (`FOR UPDATE`) serializa a escrita e dá numeração sem lacuna. `hash = sha256(campos canônicos || hash_anterior)`, calculado **no banco** por uma só função (a mesma da linha de base). Rotina diária recalcula as cadeias e grava **âncora** (cabeça da cadeia) fora da tabela. A visão do líder não mostra IP nem agente. Catálogo canônico de nomes na seção 6 da SPEC; eventos derivados não são gravados. Uma importação de extrato grava **um** evento por lote, não um por lançamento (RT-04).

## Consequências

- Adulteração por acesso direto ao banco é detectável; âncoras mantêm a detecção após restauração.
- Contenção por cadeia: escritas do mesmo projeto se serializam (aceitável no volume do MVP; mitigada por evento por lote).
- Eventos de negação (acesso negado, escrita recusada por atraso) são gravados em transação própria, porque a transação recusada é desfeita.
- Falha da auditoria desfaz a operação (decisão deliberada do SEG-103).
