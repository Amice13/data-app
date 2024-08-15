const { sign } = require('jsonwebtoken')
const elastic = require('@api-databases/elastic')
const { appConfig } = require('@api-config')
const { sendEmail } = require('@api-services')

const sendVerificationEmail = async ({ email, _userId, user, userAgent, ip, type, language }) => {

  const cookieToken = sign({
    sub: _userId,
    aud: `${appConfig.rootURL}/api/v1/auth/email-verify`
  }, appConfig.accessTokenSecret, { expiresIn: 1000 * 60 * 5 })

  // Generate the token
  let randomDigit = Math.floor(Math.random() * 10 ** appConfig.emailTokenComplexity)
  let token = String(randomDigit).padStart(appConfig.emailTokenComplexity, '0')

  // Send token to ElasticSearch
  const body = { _userId, token, type: 'Email confirmation' }
  await elastic.create({ index: 'tokens', body })

  // Send email with code to the user

  // await sendEmail({
  //   template: 'code',
  //   language,
  //   to: email,
  //   data: { token }
  // })

  // Define the following step to the user
  return {
    setToken: cookieToken,
    data: { nextStep: 'loginEmailConfirmation' }
  }
}

module.exports = sendVerificationEmail
