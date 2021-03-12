const mongoose = require('mongoose');

// Define o formato para armazenar a geolocalização
    // Está na documentação do MongoDB: https://mongoosejs.com/docs/geojson.html
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

module.exports = PointSchema;