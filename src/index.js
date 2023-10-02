const express = require('express'); // Ajuda na criação de rotas
const mongoose = require('mongoose'); // mongoose: dá acesso ao node dentro do MongoDB
const cors = require('cors'); // Permite definir o endereço do front-end que terá acesso ou qualquer um
const routes = require('./routes'); // Importa routes.js
const fetch = (...args) =>
    import ('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');


const app = express(); // Trás funções do express para a criação de rotas

const CLIENT_ID = "f89054aa23b6260b569e";
const CLIENT_SECRET = "344af4602bd6ad015c076f42b3a8aef218374fab";

mongoose.connect('mongodb+srv://aplicacaotcc:tcc2022cc@cluster0.fjhiske.mongodb.net/projetoTCC?retryWrites=true&w=majority', {
    useNewUrlParser: true, // retira avisos de conexão
    useUnifiedTopology: true, // retira avisos de conexão
});

app.use(cors());
app.use(express.json()); // Fala para o express entender json
app.use(bodyParser.json());
app.use(routes); // Fala para usar as rotas dentro de routes

// code being passed from frontend
app.get('/getAccessToken', async function (req, res) {
    console.log(req.query.code);

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code + "&prompt=consent";
    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});

// access token is going to be passed in as an Authorization header
app.get('/getUserData', async function (req, res) {
    req.get("Authorization"); // Bearer ACCESS TOKEN
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization" : req.get("Authorization") // Bearer ACCESS TOKEN
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});

const port = 3333

// Porta da aplicação
app.listen(port, () => {
    console.log(`🚀  Iniciado na porta: ${port}! 🚀`)
});  