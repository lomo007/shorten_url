
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenSchema = new Schema({
  link: {
    type: String
  },
  shortenLink: {
    type: String
  }
})

module.exports = mongoose.model('Shorten', shortenSchema)