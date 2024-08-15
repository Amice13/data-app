const { google } = require('googleapis')
const { createTransport } = require('nodemailer')
const config = require('@api-config/email')

// Authenticatation in Gmail with OAuth2

const { OAuth2 } = google.auth
const oauth2Client = new OAuth2(
  config.clientId,
  config.clientSecret,
  'https://developers.google.com/oauthplayground'
)

oauth2Client.setCredentials({
  refresh_token: config.refreshToken
})

// Initialization of the nodemailer transport

let transporter
const init = async () => {
  try {
    const accessToken = await oauth2Client.getAccessToken()
    if (!accessToken.token) {
      console.log('Gmail access token is not issued')
      return false
    }
    transporter = createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: config.email,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken,
        accessToken: accessToken.token
      }
    })
  } catch (err) {
    console.log(err)
  }
}

// Facade for the client

const sendWithNodemailer = async (options) => {
  if (!transporter) await init()
  if (!transporter) return false
  try {
    await transporter.sendMail(options)
  } catch (err) {
    console.log(err)
  }
  return true
}

module.exports = sendWithNodemailer
