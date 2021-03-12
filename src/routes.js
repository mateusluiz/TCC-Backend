const { Router } = require('express'); // Importa apenas o modulo de rotas

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.get);
routes.post('/devs', DevController.post);

routes.get('/search', SearchController.get);

routes.delete('/delete/:id', DevController.delete);

module.exports = routes;