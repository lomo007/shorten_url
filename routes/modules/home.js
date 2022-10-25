// 引入 express & express 路由器
const express = require('express')
const router = express.Router()

// 引入 Shorten 資料綱要 和 亂數產生器
const Shorten = require('../../models/shorten')
const fiveRandomwords = require('../../models/fiveRandomwords')


//路由啟動, 首頁路由
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const linkHead = 'https://'

  // 沒有輸入不送出 提醒重新輸入
  if (!req.body.link) {
    return res.render('index', { remind: `Ooops! We did't get the link. Please re-enter it again!` })
  } else if (!req.body.link.includes(linkHead)) {
    return res.render('index', { remind: `Ooops! Please add "https://" ahead!` })
  }
  // 有輸入
  const newLink = req.body.link
  // Domain name
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
      Shorten.findOne({ shortenLink: shorten }, function (err, findShorten) {
        while (findShorten !== null) {
          shorten = fiveRandomwords()
        }
      })
      //存入資料庫
      const newShorten = mainUrl + shorten
      Shorten.create({ link: newLink, shortenLink: shorten })
        //渲染到首頁
        .then(() => res.render('success', { newShorten: newShorten }))

    } else {
      //資料庫存在輸入URL      
      //渲染到首頁
      newShorten = mainUrl + findLink.shortenLink
      return res.render('success', { newShorten: newShorten })
    }
  });
})


router.get('/:short', (req, res) => {
  const shortenLink = req.params.short
  Shorten.findOne({ shortenLink: shortenLink })
    .lean()
    .then((relink) => {
      if (relink) {
        res.redirect(relink.link)
      }
    })
})


module.exports = router