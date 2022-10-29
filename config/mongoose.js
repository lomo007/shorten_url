const mongoose = require('mongoose')
const db = mongoose.connection
// 環境變數設定
if (process.env.MONGODB_URI_S !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI_S, { useNewUrlParser: true, useUnifiedTopology: true })
// 伺服器連線狀況
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
module.exports = db
