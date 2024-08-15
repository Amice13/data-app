const { sign } = require('jsonwebtoken')
const elastic = require('@api-databases/elastic')
const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')
const logActivity = require('./logActivityElastic')

const grantAccess = async ({ _userId, user }) => {
  // Generate refresh token
  const cookieToken = sign({
    sub: _userId,
    aud: `${appConfig.rootURL}/api/v1/auth/refresh`
  }, appConfig.refreshTokenSecret, { expiresIn: 1000 * 60 * 5 })

  // Generate access token
  const body = {
    sub: _userId,
    aud: `${appConfig.rootURL}`
  }

  if (user.role?.length) body.role = user.role
  if (user.scopes?.length) body.scopes = user.scopes
  if (user.permissions?.length) body.permissions = user.permissions

  const accessToken = sign(body, appConfig.accessTokenSecret, { expiresIn: 1000 * 60 * 5 })

  // Define the following step to the user
  return {
    setToken: cookieToken,
    data: { accessToken }
  }

}

module.exports = grantAccess
