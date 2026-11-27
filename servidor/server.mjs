import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { criarServidor } from './app.mjs';
import { criarGerador, mensagemDeErro, MODELO } from './ia.mjs';

const arquivoEnv = fileURLToPath(new URL('../.env', import.meta.url));
if (existsSync(arquivoEnv)) process.loadEnvFile(arquivoEnv);

// RF-153: a IA fica desligada por padrão. Quem opera liga de propósito e informa a chave.
const pedida = process.env.IA_LIGADA?.trim().toLowerCase() === 'sim';
const temCredencial = Boolean(
  process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_PROFILE,
);
const ligada = pedida && temCredencial;
const porta = Number(process.env.PORT) || 3000;

const servidor = criarServidor({
  gerar: ligada ? criarGerador() : null,
  mensagemDeErro,
  registrar: (linha) => console.log(new Date().toISOString(), linha),
});

servidor.on('error', (erro) => {
  console.error(erro.code === 'EADDRINUSE' ? `A porta ${porta} está em uso. Defina outra em PORT no .env.` : erro.message);
  process.exit(1);
});

servidor.listen(porta, '127.0.0.1', () => {
  console.log(`GestProjet (protótipo): http://localhost:${porta}`);
  if (ligada) console.log(`IA ligada (${MODELO}). Use somente dados fictícios.`);
  else if (pedida) console.log('IA_LIGADA=sim, mas falta a chave (ANTHROPIC_API_KEY no .env). Rodando em modo demonstração.');
  else console.log('IA desligada: modo demonstração. Para ligar, veja o README.md.');
});
