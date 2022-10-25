
const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

//引用 monggose , 不用回傳值不需要設定變數
require('./config/mongoose')

//載入路由模組
const routes = require('./routes')

//設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//不管路由請求何來 都優先經過 express 內建的 body-parser 處理
app.use(express.urlencoded({ extended: true }))

//使用路由模組
app.use(routes)

//路由監聽
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}/`)
})

