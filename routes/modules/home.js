// 引入 express & express 路由器
const express = require('express')
const router = express.Router()

// 引入 Shorten 資料綱要 和 亂數產生器
const Shorten = require('../../models/shorten')
const fiveRandomStringGenerator = require('../../models/fiveRandomwords')

// 路由啟動, 首頁路由
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const linkOriginal = req.body.inputLink
  // 沒有輸入不送出 提醒重新輸入
  if (!linkOriginal) {
    return res.render('index', { remindInputText: 'Ooops! We did\'t get the link. Please re-enter it again!' })
  } else if (!linkOriginal.includes(req.protocol)) {
    return res.render('index', { remindInputText: 'Ooops! Please add "https://" ahead!' })
  }
  // 輸入為新網址 -> 產生舞碼亂數
  // 輸入為已有網址
  // 資料渲染輸出
  const mainUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  let fiveRandomStringUpdate = ''
  // 修改非同步寫法
  Shorten.findOne({ linkOriginal })
    .lean()
    .then((linkData) => {
      if (linkData === null) {
        fiveRandomStringUpdate = fiveRandomStringGenerator()
        Shorten.create({ linkOriginal, fiveRandomString: fiveRandomStringUpdate })
      } else {
        fiveRandomStringUpdate = linkData.fiveRandomString
      }
      const shortenLink = mainUrl + fiveRandomStringUpdate
      res.render('success', { shortenLink })
    })
    .catch(error => console.error(error))
})

router.get('/:short', (req, res) => {
  const fiveRandomString = req.params.short
  Shorten.findOne({ fiveRandomString })
    .lean()
    .then((relinkData) => {
      if (relinkData) {
        res.redirect(relinkData.linkOriginal)
      }
    })
    .catch(error => console.error(error))
})

module.exports = router
