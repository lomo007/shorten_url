
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection

//環境變數設定
if (process.env.MOGODB_URI !== "production") {
  require('dotenv').config()
}
mongoose.connect(process.env.MOGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 伺服器連線狀況
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//路由啟動
app.get('/', (req, res) => {
  res.send('hello world')
})

//路由監聽
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}/`)
})