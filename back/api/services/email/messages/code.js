const fs = require('fs')
const path = require('node:path')
const root = path.join(__dirname, '..', 'templates', 'code.html')
const template = fs.readFileSync(root).toString()

const en = {
  template,
  title: `Verify your identity`,
  htmlText: `<p><strong>Help us protect your account</strong></p>
             <p>Before you sign in, we need to verify your identity. Please note that the veirfication code will expire in 5 minutes. Enter the following code on the sign-in page.</p>`
}

const uk = {
  template,
  title: `Підтвердіть вашу особу`,
  htmlText: `<p><strong>Допоможіть нам захистити ваш обліковий запис.</strong></p>
             <p>Для входу в обліковий запис нам необхідно підтвердити вашу особу. Будь ласка, зауважте, що код для підтвердження входу працюватими протягом 5 хвилин. Введіть настуний код на сторінці входу в обліковий запис.</p>`
}

module.exports = { en, uk }
