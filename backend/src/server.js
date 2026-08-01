import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rotasUsuarios from './routes/usuarios.js';

dotenv.config();

const app = express();

app.use(express.json())

app.use(cors({ origin: process.env.FRONTEND_URL || '*'}));

app.use('/api/usuarios', rotasUsuarios);

app.get('/', (req,res) => res.send('API rodando!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`) );