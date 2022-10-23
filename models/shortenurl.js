
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenurlSchema = new Schema({
  link: {
    type: String
  }
})

module.exports = mongoose.model('Shotenurl', shortenurlSchema)