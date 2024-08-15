const { sign } = require('jsonwebtoken')
const elastic = require('@api-databases/elastic')
const { appConfig } = require('@api-config')
const logActivity = require('./logActivityElastic')

const grantAccess = async ({ _userId, user, userAgent, ip }) => {

  // If the user is admin, we need to delete all refresh tokens
  if (user.role.includes('Admin')) {
    await elastic.remove({ index: 'tokens', filters: { _userId, type: 'Refresh token' }})
  }

  // Generate refresh token
  const cookieToken = sign({
    sub: _userId,
    aud: `${appConfig.rootURL}/api/v1/auth/refresh`,
    version: 0,
    ip, userAgent,
  }, appConfig.refreshTokenSecret, { expiresIn: appConfig.refreshTokenDuration })

  await elastic.create({
    index: 'tokens', body: {
      _userId,
      token: cookieToken,
      type: 'Refresh token'
    }
  })

  // Generate access token
  const body = {
    sub: _userId,
    aud: `${appConfig.rootURL}`
  }

  if (user.organization?.id) body.organization = user.organization.id
  if (user.restrictions) body.restrictions = user.restrictions
  if (user.role?.length) body.role = user.role
  if (user.scopes?.length) body.scopes = user.scopes
  if (user.permissions?.length) body.permissions = user.permissions

  const accessToken = sign(body, appConfig.accessTokenSecret, { expiresIn: appConfig.accessTokenDuration })

  await logActivity({
    _userId,
    email: user.email,
    organization: user.organization?.id,
    userAgent, ip,
    eventType: 'Log in',
    eventDetail: 'Access granted',
    createdAt: new Date()
  })

  // Define the following step to the user
  return {
    grantAccess: true,
    tokenType: 'Authorization',
    setToken: cookieToken,
    data: { accessToken }
  }
}

module.exports = grantAccess
