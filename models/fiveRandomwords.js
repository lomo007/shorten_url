
function fiveRandomwords() {
  //預設為空
  let shorten = ''

  //產生五碼英數
  for (let i = 0; i < 5; i++) {
    let choice = Math.floor(Math.random() * 3)
    if (choice === 0) {
      let numbers = Math.floor(Math.random() * 10 + 48).toString()
      shorten += String.fromCharCode(numbers)
    } else if (choice === 1) {
      let engCapital = Math.floor(Math.random() * 26 + 65).toString()
      shorten += String.fromCharCode(engCapital)
    } else if (choice === 2) {
      let engLowercase = Math.floor(Math.random() * 26 + 97).toString()
      shorten += String.fromCharCode(engLowercase)
    }
  }

  return shorten
}

module.exports = fiveRandomwords
