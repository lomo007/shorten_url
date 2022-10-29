const Shorten = require('./shorten')

function fiveRandomStringGenerator () {
  // 預設為空
  let newFiveRandomString = ''
  // 產生五碼英數
  // 檢查變數是否重複  *2
  for (let i = 0; i < 5; i++) {
    const randomStringCategory = Math.floor(Math.random() * 3)
    if (randomStringCategory === 0) {
      const randomStringNumber = Math.floor(Math.random() * 10 + 48).toString()
      newFiveRandomString += String.fromCharCode(randomStringNumber)
    } else if (randomStringCategory === 1) {
      const randomStringEngCapital = Math.floor(Math.random() * 26 + 65).toString()
      newFiveRandomString += String.fromCharCode(randomStringEngCapital)
    } else if (randomStringCategory === 2) {
      const randomStringEngLowercase = Math.floor(Math.random() * 26 + 97).toString()
      newFiveRandomString += String.fromCharCode(randomStringEngLowercase)
    }
  }
  checkfiveRandomString(newFiveRandomString)// *2
  return newFiveRandomString
}
// 修改非同步寫法
function checkfiveRandomString (newFiveRandomString) {
  Shorten.findOne({ fiveRandomString: newFiveRandomString })
    .lean()
    .then((data) => {
      if (data !== null) {
        fiveRandomStringGenerator()
      }
    })
}

module.exports = fiveRandomStringGenerator
