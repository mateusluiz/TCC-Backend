const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');
// const bcrypt = require('bcrypt')
const crypto = require('crypto')

// Estrutura dos dados para salvar dentro do MongoDB
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    github_username_crypt: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
       type: PointSchema,
       index: '2dsphere' // Tipo de índice eixo X e Y (https://mongoosejs.com/docs/geojson.html)
    }
});

// Criptografia
// DevSchema.pre('save', async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10) 
//     const hashedPassword = await bcrypt.hash(this.github_username, salt)
//     this.github_username_crypt = hashedPassword
//     next()
//   } catch (error) {
//     next(error)
//   }
// })

DevSchema.pre('save', async function (next) {
  try {
    const secret = 'aabbcccaabbcccaabbcccaabbcccaabb' // Senha para criptografar e descriptografar

    // bytes aleatórios para iniciar o vetor para criptografia
    const iv = Buffer.from(crypto.randomBytes(16))
    // Criptografa
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret), iv)
    let encrypted = cipher.update(this.github_username)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    this.github_username_crypt = `${iv.toString('hex')}:${encrypted.toString('hex')}`
    next()

  } catch (error) {
    next(error)
  }
})

module.exports = mongoose.model('Dev', DevSchema); // Exporta