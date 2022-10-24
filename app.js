
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection

const exphbs = require('express-handlebars')
const Shorten = require('./models/shorten')
const fiveRandomwords = require('./models/fiveRandomwords')


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

app.use(express.urlencoded({ extended: true }))

//路由啟動
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {

  // 沒有輸入不送出 提醒重新輸入
  if (!req.body.link) {
    return res.render('index', { remind: `Ooops! We did't get the link. Please re-enter it again!` })
  }

  // 有輸入
  const newLink = req.body.link
  console.log('newLink', newLink)
  const localhost = 'http://localhost:3000/'
  const herokuhost = 'http://shorten_url.herokuapp.com/'
  const mainUrl = process.env.NODE_ENV ? herokuhost : localhost

  // 查看資料庫有沒有連結
  Shorten.findOne({ link: newLink }, function (err, findLink) {
    //資料庫不存在輸入URL

    if (findLink === null) {
      //產生五碼亂數
      let shorten = fiveRandomwords()
      //查找亂數, 若不為空 -> 存在
      console.log('shorten', shorten)
      Shorten.findOne({ shortenLink: shorten }, function (err, findShorten) {
        console.log('findShorten', findShorten)
        while (findShorten !== null) {
          shorten = fiveRandomwords()
        }
      })
      //存入資料庫
      Shorten.create({ link: newLink, shortenLink: shorten })
      shorten = mainUrl + shorten
        //渲染到首頁
        .then(() => res.render('success', { shorten: shorten }))

    } else {
      //資料庫存在輸入URL      
      //渲染到首頁
      shorten = mainUrl + findLink.shortenLink
      return res.render('success', { shorten: shorten })
    }
  });
})


app.get('/:short', (req, res) => {
  const shortenLink = req.params.short
  Shorten.findOne({ shortenLink: shortenLink })
    .lean()
    .then((relink) => {
      if (relink) {
        res.redirect(relink.link)
      }
    })
})


//路由監聽
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}/`)
})

