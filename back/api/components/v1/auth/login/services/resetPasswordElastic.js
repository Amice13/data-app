const { sign } = require('jsonwebtoken')
const { appConfig } = require('@api-config')
const logActivity = require('./logActivityElastic')

const resetPassword = async ({ _userId, user }) => {
  const cookieToken = sign({
    sub: _userId,
    aud: `${appConfig.rootURL}/api/v1/auth/set-password`
  }, appConfig.accessTokenSecret, { expiresIn: 1000 * 60 * 5 })

  await logActivity({
    email: user.email,
    organization: user.organization?.id,
    userAgent, ip, _userId,
    eventType: 'Password reset',
    eventDetail: 'Password is old or is not generated by the user'
  })

  // Define the following step to the user
  return {
    setToken: cookieToken,
    data: { nextStep: 'loginSetPassword' }
  }
}

module.exports = resetPassword
