---
name: spec-builder
description: "Escreve as especificações técnicas da Gestprojet a partir do PRD — arquitetura, modelo de dados, APIs, integrações, uso de inteligência artificial, infraestrutura e decisões técnicas (ADRs). Use quando o pedido for sobre como construir o sistema: stack, banco de dados, endpoints, multi-tenant, filas, armazenamento de documentos, integrações com agências, bancos ou ORCID/Lattes, ou arquitetura dos agentes de IA."
---

# spec-builder: especificações técnicas da Gestprojet

Entrada obrigatória: `docs/01-prd.md`. Se não existir, pare e recomende rodar `prd-builder`.
Saídas: `docs/02-spec.md` e decisões em `docs/adr/NNNN-titulo.md`.

## Processo

1. Leia o PRD inteiro. Monte uma tabela de rastreabilidade RF → componente. Todo RF Must precisa de um componente responsável.
2. Leia `docs/06-seguranca.md` se existir; os controles de lá são requisitos da arquitetura, não um apêndice.
3. Escolha o mais simples que atenda ao MVP. Toda escolha de tecnologia relevante vira um ADR curto (contexto, opções, decisão, consequências).
4. Escreva a spec com o modelo abaixo. Prefira diagramas em Mermaid dentro do Markdown.

## Diretrizes de arquitetura (padrão, salvo decisão contrária em ADR)

- **Multi-tenant por organização** (instituição, fundação ou empresa), com isolamento lógico por `tenant_id` em todas as tabelas e políticas de linha (RLS) no banco. O **projeto** é a unidade de assinatura e de permissão.
- **Monólito modular** no MVP, com módulos alinhados aos do PRD (projetos, financeiro, prestação de contas, documentos, maturidade, editais, relatórios, IA, cobrança, administração). Microsserviços só com motivo documentado.
- **Banco relacional** (PostgreSQL) para dados de negócio; armazenamento de objetos para documentos e fotos, com hash SHA-256 registrado para rastreabilidade.
- **Trilha de auditoria imutável** (append-only) para ações sobre dinheiro, permissões, documentos e aprovações.
- **Valores monetários** em inteiro de centavos ou decimal exato, nunca ponto flutuante. Moeda explícita.
- **IA**: os agentes trabalham sobre dados do próprio tenant, citam a evidência usada, e qualquer ação com efeito (enviar, aprovar, movimentar) exige confirmação humana. Prompts, versões de modelo e saídas ficam registrados.
- **Integrações** atrás de adaptadores (porta/adaptador), para trocar fornecedor sem tocar no domínio.

## Modelo de `docs/02-spec.md`

```markdown
# Gestprojet: especificação técnica
Versão · Data · PRD de referência (versão)

## 1. Visão geral da arquitetura   (diagrama de contexto e de contêineres)
## 2. Stack e justificativa          (link para ADRs)
## 3. Módulos e responsabilidades   (tabela módulo → RFs atendidos)
## 4. Modelo de dados
   Entidades principais: Organização, Usuário, Papel, Projeto, Assinatura, Edital,
   TermoDeOutorga, PlanoDeTrabalho, Meta, Atividade, Tarefa, Membro/Bolsista,
   Rubrica, Orçamento, Despesa, Comprovante, Remanejamento, ContaBancária,
   Rendimento, PrestaçãoDeContas, Relatório, Documento, AvaliaçãoTRL, AvaliaçãoMRL,
   Evidência, Risco, ResultadoPI, EventoDeAuditoria.
   Diagrama ER (Mermaid) + regras de integridade.
## 5. APIs
   Estilo (REST/JSON), versionamento, autenticação, paginação, erros.
   Tabela: método · rota · descrição · papel exigido · RF.
## 6. Integrações          (agências, bancos/extratos, ORCID, Lattes, CrossRef/OpenAlex, assinatura eletrônica, pagamento)
## 7. Inteligência artificial  (agentes, fontes de dados, limites, avaliação de qualidade, custo)
## 8. Requisitos não funcionais  (metas numéricas: latência, disponibilidade, RPO/RTO)
## 9. Infraestrutura e implantação  (ambientes, CI/CD, observabilidade, backup)
## 10. Riscos técnicos e questões em aberto
## 11. Rastreabilidade RF → componente → teste
```

## Lista de verificação

- [ ] Todo RF Must está na tabela de rastreabilidade.
- [ ] Toda tabela com dado de tenant tem `tenant_id` e política de acesso.
- [ ] Rotas que tocam dinheiro, permissão ou documento geram evento de auditoria.
- [ ] Dados pessoais estão marcados no modelo (para o `security-builder`).
- [ ] Decisões relevantes têm ADR.
- [ ] Próximo passo indicado: `uxdesign-builder`.
