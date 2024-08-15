const { appConfig } = require('@api-config')
const { sign } = require('jsonwebtoken')
const elastic = require('@api-databases/elastic')
const { CustomException } = require('@api-helpers/customException')

const {
  logActivity,
  checkBruteforce,
  checkPasswordAgeAndAuthor,
  grantAccess,
  resetPassword
} = require('@api-common')

const refreshToken = async ({ _userId, version, token, ip, userAgent }) => {
  // Get user data
  const userResponse = await elastic.getById({ index: 'users', id: _userId })
  const user = userResponse._source

  if (user.status === 'Blocked') throw (403, 'User is blocked')
  // Get the current refresh token
  const tokenResponse = await elastic.get({
    index: 'tokens',
    filters: {
      _userId,
      token,
      type: 'Refresh token'
    },
    size: 1
  })
  
  if (tokenResponse.hits?.total?.value !== 1) {
    await logActivity({
      _userId,
      email: user.email,
      organization: user.organization?.id,
      userAgent, ip,
      eventType: 'Refresh token fails',
      eventDetail: 'Non-existing refresh token is provided'
    })
    throw CustomException(403, 'This user does not exist or the password is wrong')
  }
  const tokenId = tokenResponse.hits.hits[0]._id

  // Generate refresh token
  const cookieToken = sign({
    sub: _userId,
    aud: `${appConfig.rootURL}/api/v1/auth/refresh`,
    version: version + 1,
    ip, userAgent,
  }, appConfig.refreshTokenSecret, { expiresIn: appConfig.refreshTokenDuration })

  // Save the refresh token
  await elastic.updateById({ index: 'tokens', id: tokenId, body: { token: cookieToken } })

  // Generate new access token
  const body = {
    sub: _userId,
    aud: `${appConfig.rootURL}`
  }

  if (user.org) body.org = user.org
  if (user.restrictions) body.restrictions = user.restrictions
  if (user.role?.length) body.role = user.role
  if (user.scopes?.length) body.scopes = user.scopes
  if (user.permissions?.length) body.permissions = user.permissions

  const accessToken = sign(body, appConfig.accessTokenSecret, { expiresIn: appConfig.accessTokenDuration })

  return {
    grantAccess: true,
    tokenType: 'Authorization',
    setToken: cookieToken,
    data: { accessToken }
  }
}

module.exports = refreshToken
