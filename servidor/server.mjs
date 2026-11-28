import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { criarServidor } from './app.mjs';
import { configurarIA } from './config.mjs';

const arquivoEnv = fileURLToPath(new URL('../.env', import.meta.url));
if (existsSync(arquivoEnv)) process.loadEnvFile(arquivoEnv);

const ia = configurarIA(process.env);
const porta = Number(process.env.PORT) || 3000;

const servidor = criarServidor({ ...ia, registrar: (linha) => console.log(new Date().toISOString(), linha) });

servidor.on('error', (erro) => {
  console.error(erro.code === 'EADDRINUSE' ? `A porta ${porta} está em uso. Defina outra em PORT no .env.` : erro.message);
  process.exit(1);
});

servidor.listen(porta, '127.0.0.1', () => {
  console.log(`GestProjet (protótipo): http://localhost:${porta}`);
  if (ia.gerar) console.log(`IA ligada: ${ia.provedor}, modelo ${ia.modelo}. Use somente dados fictícios.`);
  else console.log(`Modo demonstração. ${ia.motivo}`);
});
