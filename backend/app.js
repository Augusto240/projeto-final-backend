import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import posteRoutes from './routes/posteRoutes.js';
import sequelize from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtém o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200', // Substitua pelo endereço do seu frontend se for diferente
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adicione outros métodos HTTP conforme necessário
  allowedHeaders: ['Content-Type', 'Authorization'] // Adicione outros cabeçalhos conforme necessário
}));

app.use(bodyParser.json());

// Serve arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', usuarioRoutes); // Prefixo para as rotas de usuários
app.use('/api', posteRoutes); // Prefixo para as rotas de produtos

// Conectando ao banco de dados
sequelize.sync()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso.');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => console.log('Erro ao conectar ao banco de dados:', err));
