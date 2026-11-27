---
name: security-builder
description: "Cuida da segurança e conformidade da GestProjet — LGPD, controle de acesso por papel e por projeto, proteção de dados financeiros e pessoais, trilha de auditoria, segurança dos agentes de IA e revisão de segurança do código. Use ao definir requisitos de segurança, montar a matriz de permissões, fazer análise de ameaças, revisar um diff ou pull request, preparar documentação LGPD (inventário de dados, RIPD) ou planejar resposta a incidentes."
---

# security-builder: segurança e conformidade da GestProjet

Saída principal: `docs/06-seguranca.md`. Revisões de código: relatório na conversa ou em `docs/revisoes/AAAA-MM-DD-tema.md`.

A segurança entra **desde a primeira etapa**. Esta skill pode ser chamada logo depois do PRD (para gerar requisitos) e de novo em cada etapa e em cada mudança de código (para revisar).

## Modos

### 1. Requisitos e arquitetura de segurança
Produza `docs/06-seguranca.md` com:

1. **Inventário de dados (LGPD):** dado · categoria (pessoal, sensível, financeiro, sigiloso/PI) · finalidade · base legal (art. 7º/11) · onde fica · quem acessa · retenção · descarte. Papéis: a instituição cliente costuma ser controladora; a GestProjet, operadora. Confirme por contrato.
2. **Direitos do titular:** como atender acesso, correção, portabilidade e eliminação, respeitando prazos de guarda exigidos por financiadores e órgãos de controle.
3. **Matriz de permissões (RBAC + escopo de projeto):** papéis × ações × recursos. Padrão: mínimo privilégio, acesso negado por padrão, papéis por projeto (coordenador de um projeto não vê outro). Separação de funções: quem lança despesa não aprova a mesma despesa.
4. **Autenticação:** MFA obrigatório para perfis com acesso financeiro ou administrativo; SSO institucional (SAML/OIDC) como opção; sessões com expiração; revogação imediata no desligamento.
5. **Proteção de dados:** TLS 1.2+ em trânsito; criptografia em repouso; dados bancários e documentos sigilosos com criptografia adicional por campo; segredos em cofre, nunca no código; backups criptografados e testados.
6. **Isolamento multi-tenant:** `tenant_id` + RLS no banco; testes automáticos que tentam ler dados de outro tenant.
7. **Auditoria:** eventos append-only com quem, o quê, quando, de onde, valor anterior e novo. Obrigatórios: login, mudança de permissão, despesa, remanejamento, uso de rendimentos, aprovação, exclusão, exportação de dados, ação de agente de IA.
8. **Segurança da IA:** agentes só leem dados do tenant e do projeto em que o usuário tem acesso; documentos enviados (editais, PDFs) são tratados como dado, nunca como instrução (proteção contra injeção de prompt); nenhuma ação com efeito sem confirmação humana; não enviar dados pessoais a provedores sem contrato e base legal; registrar prompt, modelo e saída.
9. **Modelagem de ameaças (STRIDE)** por módulo, com controle e responsável.
10. **Incidentes:** detecção, contenção, comunicação à ANPD e aos titulares quando cabível, registro.

### 2. Revisão de código
Ao revisar um diff, verifique nesta ordem e reporte só achados reais, com arquivo:linha, cenário de exploração e correção:
- Controle de acesso: rota ou consulta sem checagem de papel/projeto; IDOR; falta de filtro por `tenant_id`.
- Injeção: SQL, comandos, templates, injeção de prompt em agentes.
- Autenticação e sessão.
- Exposição de dados: logs com dados pessoais ou bancários, respostas de API com campos demais, mensagens de erro detalhadas.
- Dinheiro: ponto flutuante em valores, condição de corrida em saldo de rubrica, operação financeira sem auditoria.
- Upload de arquivos: tipo, tamanho, varredura, armazenamento fora da raiz pública, URLs assinadas com expiração.
- Dependências com vulnerabilidade conhecida e segredos no repositório.

Classifique: crítica · alta · média · baixa. Não reporte estilo.

## Lista de verificação de `docs/06-seguranca.md`

- [ ] Todo dado pessoal do modelo de dados está no inventário com base legal.
- [ ] Matriz de permissões cobre todos os papéis do PRD.
- [ ] Separação de funções definida para fluxos financeiros.
- [ ] Eventos de auditoria batem com os fluxos do `workflow-builder`.
- [ ] Regras de segurança da IA aplicadas a cada agente do `agent-skill-builder`.
