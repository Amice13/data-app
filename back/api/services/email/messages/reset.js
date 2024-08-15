const fs = require('fs')
const path = require('node:path')
const root = path.join(__dirname, '..', 'templates', 'confirmation.html')
const template = fs.readFileSync(root).toString()

const shortDate = () => { return new Date().toLocaleString(['uk-UA'], { day: '2-digit', month: '2-digit', year: 'numeric' }) }

const en = {
  template,
  title: `Reset password instructions`,
  htmlText: `<p><strong>You have requested to reset the password for your account on the app!</strong></p>
             <p>If you did not perform this request, you can safely ignore this email.</p>
             <p>Otherwise, click the link below to complete the process:</p>`,
  button: `Reset`
}

const uk = {
  template,
  title: `Інструкція щодо зміни паролю`,
  htmlText: `<p><strong>Ви зробили запит на зміну паролю у вашому обліковому записі!</strong></p>
             <p>Якщо цей запит зробили не ви, будь ласка проігноруйте цей лист</p>
             <p>В іншому випадку, натисніть на кнопку нижче, щоб завершити процес:</p>`,
  button: `Змінити`
}

module.exports = { en, uk }
