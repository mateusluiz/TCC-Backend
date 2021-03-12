const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

// Estrutura dos dados para salvar dentro do MongoDB
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
       type: PointSchema,
       index: '2dsphere' // Tipo de índice eixo X e Y (https://mongoosejs.com/docs/geojson.html)
    }
});

module.exports = mongoose.model('Dev', DevSchema); // Exporta