// Entrada na Vercel: todas as rotas passam por aqui, sempre com login conferido no servidor.
import { criarTratador } from '../servidor/app.mjs';
import { configurarIA } from '../servidor/config.mjs';

export default criarTratador({ ...configurarIA(process.env), exigirLogin: true, registrar: (linha) => console.log(linha) });
