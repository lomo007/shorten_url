
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection

const exphbs = require('express-handlebars')

//環境變數設定
if (process.env.MONGODB_URI_S !== "production") {
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

//設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//路由啟動
app.get('/', (req, res) => {
  res.render('index')
})

//路由監聽
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}/`)
})