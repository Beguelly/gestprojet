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

1. Copie `.env.example` para `.env`.
2. Escolha o provedor em `IA_PROVEDOR` e cole a chave:
   - `google` (em uso hoje): chave de <https://aistudio.google.com/apikey> em `GEMINI_API_KEY`;
   - `anthropic`: chave de <https://platform.claude.com> em `ANTHROPIC_API_KEY`.
3. Mantenha `IA_LIGADA=sim`, pare o servidor (Ctrl+C) e rode `npm start` de novo.

O `.env` está no `.gitignore`. Nunca coloque a chave no HTML, no repositório ou em um chat. Se uma chave vazar, revogue-a e crie outra.

**Plano gratuito do Gemini:** pelos termos do Google, o conteúdo enviado ao serviço gratuito pode ser usado para melhorar os produtos e lido por revisores humanos. Só o projeto do Google Cloud com faturamento ativo entra nas regras do serviço pago. Confira os termos vigentes em <https://ai.google.dev/gemini-api/terms>.

## O que o assistente faz

- Explica a tela aberta, aponta pendências e responde perguntas sobre o que está **visível** nela.
- Só sugere: não aprova checagem, não lança valor, não confirma regra e não registra nível TRL/MRL (RN-014).
- Rotula cada resposta como sugestão e informa a tela usada como base (RF-090).
- A plataforma continua funcionando com a IA desligada (RF-091).

### O que é enviado ao provedor quando a IA está ligada

As regras do assistente, a pergunta, até três perguntas e respostas anteriores e o texto visível da tela aberta (com o nome do projeto e o papel simulado). Nenhum arquivo é enviado.

## Agenda de reuniões

No menu lateral, **Agenda de reuniões**. As reuniões ficam salvas no navegador de quem marcou (não há banco de dados), e os contatos não são enviados à IA.

Cada reunião tem botões que abrem o **e-mail** ou o **WhatsApp** com a mensagem pronta, e um arquivo de agenda (`.ics`). Isso funciona em qualquer endereço, sem configuração.

O **envio automático** existe só no computador (`localhost`). No site publicado ele fica desligado, para que quem tem um acesso de teste não envie mensagens pelas suas contas.

### E-mail automático (Gmail)

1. Ative a verificação em duas etapas e crie uma senha de app em <https://myaccount.google.com/apppasswords>.
2. No `.env`: `EMAIL_LIGADO=sim`, `SMTP_USUARIO=` seu e-mail e `SMTP_SENHA=` a senha de app.
3. Reinicie o servidor.

Contas institucionais podem não permitir senha de app; nesse caso, peça à área de TI os dados de SMTP.

### WhatsApp (API não oficial)

> **Risco:** usa a biblioteca [Baileys](https://github.com/WhiskeySockets/Baileys), que não é da Meta. O uso contraria os Termos do WhatsApp e **o número pode ser bloqueado**. Prefira um número secundário e envie só para quem espera a mensagem.

1. No `.env`: `WHATSAPP_LIGADO=sim` e reinicie o servidor.
2. Na Agenda, aceite o aviso e clique em **Conectar WhatsApp**.
3. No celular: **WhatsApp → Aparelhos conectados → Conectar um aparelho** e aponte para o código.

A pasta `.whatsapp-sessao/` dá acesso à sua conta: não a copie nem compartilhe. Para encerrar, clique em **Desconectar** ou remova o aparelho no celular. Há intervalo entre mensagens e limite de 60 por hora.

## Site publicado

Endereço: <https://gestprojet-prototipo.vercel.app>. O navegador pede e-mail e senha (os mesmos acessos de teste).

É um **ambiente de demonstração com dados fictícios**, não a plataforma em produção: não há banco de dados, cadastro de usuários nem controle de custo por pessoa.

Para publicar uma nova versão (é preciso ter acesso ao projeto na Vercel):

```bash
npx vercel deploy --prod
```

Variáveis do ambiente de produção na Vercel: `IA_LIGADA`, `IA_PROVEDOR`, `GEMINI_API_KEY` (secreta) e `NODEJS_HELPERS=0`. Para trocar a chave:

```bash
npx vercel env rm GEMINI_API_KEY production
npx vercel env add GEMINI_API_KEY production --sensitive
npx vercel deploy --prod
```

Para voltar à versão anterior: `npx vercel rollback`.

## Segurança

- No computador, o servidor escuta somente em `127.0.0.1` e recusa outros endereços e origens.
- No site publicado, o servidor confere o login em todas as rotas, inclusive nas chamadas à IA.
- Entrega apenas a página; nenhum outro arquivo do projeto é acessível.
- Limita o tamanho do pedido, a 20 perguntas por minuto e 2 simultâneas. **No site publicado esses limites valem por instância do servidor**, não são um teto global: defina limites e alertas de gasto na conta do provedor.
- Não registra perguntas nem respostas; só situação, modelo e quantidade de tokens.

## Antes de usar com dados reais

O PRD mantém o envio de conteúdo de projetos a provedor externo de IA **desligado até existir contrato com o provedor e RIPD** (RF-153, RN-051). Este assistente é um experimento com dados fictícios e ainda não está no PRD (veja a T-025 e a T-026 em `TASKS.md`). O PRD registra o Claude como provedor; o uso do Google é uma decisão provisória do dono, de 27/11/2026.

## Verificações

```bash
npm test                             # servidor e adaptador de IA, sem rede
python design/verificar-contraste.py # contraste WCAG
```

## Organização

| Pasta | Conteúdo |
|---|---|
| `design/` | Protótipo (`index.html`) e logotipos |
| `servidor/` | Servidor, adaptadores de IA (`ia-google.mjs`, `ia.mjs`) e testes |
| `api/` | Entrada do site publicado na Vercel |
| `docs/` | Briefing, PRD, SPEC, UX, fluxos, segurança e ADRs |
