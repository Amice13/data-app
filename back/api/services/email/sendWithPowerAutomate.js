const axios = require('axios')
const { appConfig } = require('@api-config')

const sendWithPowerAutomate = async (options) => {
  await axios.post(appConfig.emailMSPowerAutomateURL, options, {
    headers: {
      authorization: `Bearer ${appConfig.emailMSPowerAutomateAuth}`
    }
  })
  return true
}

module.exports = sendWithPowerAutomate
