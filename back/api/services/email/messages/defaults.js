const { appConfig } = require('@api-config')

const en = {
  appName: appConfig.appName,
  email: appConfig.emailSender,
  signature: `Best regards,<br>TG Search Team`,
  notification: `This email and any attachments are confidential. If you are not the intended recipient, please delete all copies and notify the sender immediately.`
}

const uk = {
  appName: appConfig.appName,
  email: appConfig.emailSender,
  signature: `Комадна підтримки TG Search`,
  notification: `Цей електронний лист та усі додатки до нього є конфіденційними. Якщо ви отримали цей лист випадково, будь ласка, видаліть його та повідомте відправника негайно.`
}

module.exports = { en, uk }
