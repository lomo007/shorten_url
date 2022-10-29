const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenSchema = new Schema({
  linkOriginal: {
    type: String
  },
  fiveRandomString: {
    type: String
  }
})
module.exports = mongoose.model('Shorten', shortenSchema)
