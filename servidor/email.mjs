// Envio de e-mail por SMTP (no Gmail, use uma "senha de app", nunca a senha da conta).
import nodemailer from 'nodemailer';

export function criarEmail({ host = 'smtp.gmail.com', porta = 465, usuario, senha, transporte }) {
  const envio = transporte ?? nodemailer.createTransport({
    host,
    port: porta,
    secure: porta === 465,
    requireTLS: porta !== 465,
    auth: { user: usuario, pass: senha },
  });
  return {
    remetente: usuario,
    // Uma mensagem por pessoa: um participante não vê o endereço do outro.
    async enviar({ para, assunto, texto, agenda }) {
      await envio.sendMail({
        from: usuario,
        to: para,
        subject: assunto,
        text: texto,
        icalEvent: { method: 'PUBLISH', filename: 'reuniao.ics', content: agenda },
      });
    },
  };
}

export function mensagemDeErroEmail(erro) {
  if (erro?.code === 'EAUTH') return 'O servidor de e-mail recusou o usuário ou a senha de app.';
  if (['ECONNECTION', 'ETIMEDOUT', 'ESOCKET', 'EDNS'].includes(erro?.code)) return 'Sem conexão com o servidor de e-mail.';
  if (erro?.code === 'EENVELOPE') return 'O endereço foi recusado.';
  return 'Não foi possível enviar o e-mail.';
}
