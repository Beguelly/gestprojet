# GestProjet

Plataforma de gestão de projetos de pesquisa (PD&I). Este repositório tem os documentos de planejamento (`docs/`), o diário (`TASKS.md`) e o **protótipo navegável** (`design/index.html`), agora com um **assistente de IA**.

> É um protótipo. Todos os dados são fictícios. Não digite dados reais, pessoais ou sigilosos.

## Como testar

Requisito: [Node.js](https://nodejs.org) 20.12 ou mais novo.

No Windows, dê dois cliques em `iniciar.cmd`. Em qualquer sistema:

```bash
npm ci
npm start
```

Abra <http://localhost:3000> e entre com um dos acessos de teste (arquivo guardado fora do repositório). Clique em **Assistente IA**, no alto da tela.

## Ligar a IA

Sem configuração, o assistente fica em **modo demonstração**: respostas prontas, que não são IA, e nada sai do computador.

Para usar o Claude:

1. Crie uma chave em <https://platform.claude.com> (o uso é cobrado por consumo).
2. Copie `.env.example` para `.env` e cole a chave em `ANTHROPIC_API_KEY`. Mantenha `IA_LIGADA=sim`.
3. Pare o servidor (Ctrl+C) e rode `npm start` de novo.

O `.env` está no `.gitignore`. Nunca coloque a chave no HTML, no repositório ou em um chat.

## O que o assistente faz

- Explica a tela aberta, aponta pendências e responde perguntas sobre o que está **visível** nela.
- Só sugere: não aprova checagem, não lança valor, não confirma regra e não registra nível TRL/MRL (RN-014).
- Rotula cada resposta como sugestão e informa a tela usada como base (RF-090).
- A plataforma continua funcionando com a IA desligada (RF-091).

### O que é enviado à Anthropic quando a IA está ligada

As regras do assistente, a pergunta, até três perguntas e respostas anteriores e o texto visível da tela aberta (com o nome do projeto e o papel simulado). Nenhum arquivo é enviado.

## Segurança do servidor local

- Escuta somente em `127.0.0.1` e recusa outros endereços e origens.
- Entrega apenas a página; nenhum outro arquivo do projeto é acessível.
- Limita tamanho do pedido, 20 perguntas por minuto e 2 simultâneas.
- Não registra perguntas nem respostas; só situação, modelo e quantidade de tokens.

**Não publique este servidor na internet.** Ele não tem login real nem controle de custo por usuário (isso depende da T-104). O portão de e-mail e senha da página é apenas demonstrativo.

## Antes de usar com dados reais

O PRD mantém o envio de conteúdo de projetos a provedor externo de IA **desligado até existir contrato com o provedor e RIPD** (RF-153, RN-051). Este assistente é um experimento com dados fictícios e ainda não está no PRD (veja a T-025 em `TASKS.md`).

## Verificações

```bash
npm test                             # servidor e adaptador de IA, sem rede
python design/verificar-contraste.py # contraste WCAG
```

## Organização

| Pasta | Conteúdo |
|---|---|
| `design/` | Protótipo (`index.html`) e logotipos |
| `servidor/` | Servidor local, adaptador de IA (`ia.mjs`) e testes |
| `docs/` | Briefing, PRD, SPEC, UX, fluxos, segurança e ADRs |
