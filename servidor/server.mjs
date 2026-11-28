import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { criarServidor } from './app.mjs';
import { configurarIA } from './config.mjs';
import { criarWhatsApp } from './whatsapp.mjs';
import { criarEmail, mensagemDeErroEmail } from './email.mjs';

const arquivoEnv = fileURLToPath(new URL('../.env', import.meta.url));
if (existsSync(arquivoEnv)) process.loadEnvFile(arquivoEnv);

const ia = configurarIA(process.env);
const porta = Number(process.env.PORT) || 3000;

const registrar = (linha) => console.log(new Date().toISOString(), linha);
const sim = (nome) => process.env[nome]?.trim().toLowerCase() === 'sim';

const whatsapp = sim('WHATSAPP_LIGADO')
  ? criarWhatsApp({ pasta: fileURLToPath(new URL('../.whatsapp-sessao', import.meta.url)), registrar })
  : null;

const temEmail = sim('EMAIL_LIGADO') && process.env.SMTP_USUARIO && process.env.SMTP_SENHA;
const email = temEmail
  ? criarEmail({
      host: process.env.SMTP_HOST || undefined,
      porta: Number(process.env.SMTP_PORTA) || undefined,
      usuario: process.env.SMTP_USUARIO.trim(),
      senha: process.env.SMTP_SENHA.replace(/\s+/g, ''),
    })
  : null;

const servidor = criarServidor({ ...ia, whatsapp, email, mensagemDeErroEmail, registrar });

servidor.on('error', (erro) => {
  console.error(erro.code === 'EADDRINUSE' ? `A porta ${porta} está em uso. Defina outra em PORT no .env.` : erro.message);
  process.exit(1);
});

servidor.listen(porta, '127.0.0.1', () => {
  console.log(`GestProjet (protótipo): http://localhost:${porta}`);
  if (ia.gerar) console.log(`IA ligada: ${ia.provedor}, modelo ${ia.modelo}. Use somente dados fictícios.`);
  else console.log(`Modo demonstração. ${ia.motivo}`);
  console.log(`WhatsApp: ${whatsapp ? 'ligado (API não oficial)' : 'desligado'} · E-mail automático: ${email ? 'ligado' : 'não configurado'}`);
  if (whatsapp?.temSessao()) whatsapp.conectar();
});
