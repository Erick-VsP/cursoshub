import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swagger from './config/swagger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

import instituicaoRoutes from './routes/instituicao.js';
import empresaRoutes from './routes/empresa.js';
import instrutorRoutes from './routes/instrutor.js';
import estudanteRoutes from './routes/estudante.js';
import cursoRoutes from './routes/curso.js';
import inscricaoRoutes from './routes/inscricao.js';
import pacoteRoutes from './routes/pacote.js';
import cursoPacoteRoutes from './routes/curso_pacote.js';
import escolhaPacoteRoutes from './routes/escolha_pacote.js';
import authRoutes from './routes/auth.js';

app.use('/instituicao', instituicaoRoutes);
app.use('/empresa', empresaRoutes);
app.use('/instrutor', instrutorRoutes);
app.use('/estudante', estudanteRoutes);
app.use('/curso', cursoRoutes);
app.use('/inscricao', inscricaoRoutes);
app.use('/pacote', pacoteRoutes);
app.use('/curso_pacote', cursoPacoteRoutes);
app.use('/escolha_pacote', escolhaPacoteRoutes);
app.use('/auth', authRoutes);

swagger(app);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

app.get('/', (req, res) => {
    res.send('API de CursosHub está funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
