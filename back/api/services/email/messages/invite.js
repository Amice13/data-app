const fs = require('fs')
const path = require('node:path')
const root = path.join(__dirname, '..', 'templates', 'confirmation.html')
const template = fs.readFileSync(root).toString()

const en = {
  template,
  title: `You are invited`,
  htmlText: `<p><strong>You are invited to register in the app!</strong></p>
             <p>To start your registration, click the button below. If you receive this email by a mistake, please, ignore it.</p>`,
  button: `Register`
}

const uk = {
  template,
  title: `Ви запрошені зареєструватися`,
  htmlText: `<p><strong>Вас запросили зареєструвалится у додатку!</strong></p>
             <p>Щоб розпочати вашу реєстрацію, натисніть на кнопку нижче. Якщо ви отримали це повідомлення випадково, будь ласка, проігноруйте його</p>`,
  button: `Зареєструватися`
}

module.exports = { en, uk }
