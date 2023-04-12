const express = require('express'); // Ajuda na criação de rotas
const mongoose = require('mongoose'); // mongoose: dá acesso ao node dentro do MongoDB
const cors = require('cors'); // Permite definir o endereço do front-end que terá acesso ou qualquer um
const routes = require('./routes'); // Importa routes.js

const app = express(); // Trás funções do express para a criação de rotas

mongoose.connect('mongodb+srv://aplicacaotcc:tcc2022cc@cluster0.fjhiske.mongodb.net/projetoTCC?retryWrites=true&w=majority', {
    useNewUrlParser: true, // retira avisos de conexão
    useUnifiedTopology: true, // retira avisos de conexão
});

// app.use(): algo que é válido para todas as rotas

app.use(cors());
app.use(express.json()); // Fala para o express entender json
app.use(routes); // Fala para usar as rotas dentro de routes

const port = 3333

// Porta da aplicação
app.listen(port, () => {
    console.log(`🚀  Iniciado na porta: ${port}! 🚀`)
});  