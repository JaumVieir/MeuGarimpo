import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rotasUsuarios from './routes/usuarios.js';

dotenv.config();

const app = express();

app.use(express.json())

const origensPermitidas = (process.env.FRONTEND_URL || '*')
    .split(',')
    .map((origem) => origem.trim());

app.use(cors({ origin: origensPermitidas.includes('*') ? '*' : origensPermitidas }));

app.use('/api/usuarios', rotasUsuarios);

app.get('/', (req,res) => res.send('API rodando!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`) );