const fs = require('fs')
const path = require('node:path')
const root = path.join(__dirname, '..', 'templates', 'general.html')
const template = fs.readFileSync(root).toString()

const shortDate = () => { return new Date().toLocaleString(['uk-UA'], { day: '2-digit', month: '2-digit', year: 'numeric' }) }

const en = {
  template,
  title: `${shortDate} - Your account is under attack!`,
  htmlText: `<p><strong>Too many tries to log in!</strong></p>
             <p>There were 10 attempts to login to your account with the wrong password from the following IP addresses:</p>
             ~~ ipList ~~
             <p>To secure your account we temporarily blocked the login!</p>
             <p>In case you forgot the password, try to log in again in an hour or use "Recover password" in the login form.</p>`,
}

const uk = {
  template,
  title: `${shortDate} - Ваш обліковий запис під загрозою`,
  htmlText: `<p><strong>Занадто багато спроб увійти!</strong></p>
             <p>Ми зареєстрували 10 спроб входу до вашого облікового запису із невірним паролем з наступних IP адрес:</p>
             ~~ ipList ~~
             <p>Щоб захистити ваш обліковий запис ми тимчасово заблокували можливість входу!</p>
             <p>Спробуйте увійти через годину або якщо ви забули свій пароль, натисніть "Скинути пароль" у формі входу.</p>`,
}

module.exports = { en, uk }
