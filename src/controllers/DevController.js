const axios = require('axios'); // Faz chamadas para outras API's disponíveis
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async get(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async delete(request, response){
        const { id } = request.params;

        await Dev.findByIdAndDelete(id);

        return response.json( {message: 'Sucesso'} );
    },
    // async: função pode demorar para responder porque a API do github pode atrasar
    async post(request, response) {
        const {github_username, techs, latitude, longitude} =  request.body;

        let dev = await Dev.findOne({ github_username });
        
        if(!dev){            // await: aguarda o consumo de API para devolver uma resposta e continuar
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            // Se name não existir pega o valor do login
            let { name = login, avatar_url, bio } = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                 github_username,
                 name,
                 avatar_url,
                 bio,
                 techs: techsArray,
                 location,
            });
        } else {
            return response.json({ message: 'Já cadastrado' })
        }
    
        return response.json(dev);
    }
};