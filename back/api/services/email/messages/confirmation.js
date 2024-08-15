const fs = require('fs')
const path = require('node:path')
const root = path.join(__dirname, '..', 'templates', 'confirmation.html')
const template = fs.readFileSync(root).toString()

const en = {
  template,
  title: `Please confirm your email address`,
  htmlText: `<p><strong>You have successfully registered in the app!</strong></p>
             <p>To complete your registration, please confirm your email address by clicking the button below:</p>`,
  button: `Confirm`
}

const uk = {
  template,
  title: `Підтвердіть вашу особу`,
  htmlText: `<p><strong>Ви успішно зареєструвалися у додатку!</strong></p>
             <p>Щоб завершити вашу реєстрацію, будь ласка, підтвердіть свою електронну пошту, натиснувши на кнопку нижче:</p>`,
  button: `Підтвердити`
}

module.exports = { en, uk }
