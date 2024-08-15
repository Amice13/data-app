const { verify } = require('jsonwebtoken')
const { appConfig } = require('@api-config')
const { configs, CustomException } = require('@api-helpers')

module.exports = (req, res, next) => {
  // Check the user permissions
  const checks = configs[req.key].methods[req.method.toLowerCase()]
  if (!checks?.isProtectedRoute) return next()
  // Check authorization token stored in secure cookies
  if (checks.checkAuthorizationToken) {
    // Check the authorization token integrity
    const { Authorization } = req.cookies
    if (!Authorization) throw CustomException(401, 'You are not authorized to access this endpoint')
    const token = Authorization
    if (!token) throw CustomException(401, 'You are not authorized to access this endpoint')
    // Get the user's data
    let user
    try {
      user = verify(token, appConfig.refreshTokenSecret)
    } catch (err) {
      throw CustomException(401, 'Your refresh token is wrong or expired')
    }
    req.user = user
    // Check the audience
    if (checks.checkAuthorizationAudience && user.aud !== appConfig.rootURL + appConfig.basePath + req.key) {
      throw CustomException(401, 'You are not authorized to access this endpoint')
    }
  }

  // Check access token from the header
  if (checks.checkAccessToken) {
    // Check the authorization token integrity
    const { authorization } = req.headers
    if (!authorization) throw CustomException(401, 'You are not authorized to access this endpoint')
    const token = authorization.split(/ /)[1]
    if (!token) throw CustomException(401, 'You are not authorized to access this endpoint')

    // Get the user's data (access token data will override refreshtoken data)
    let user
    try {
      user = verify(token, appConfig.accessTokenSecret)
    } catch (err) {
      throw CustomException(401, 'Your refresh token is wrong or expired')
    }
    req.user = user

    if (checks.checkAccessAudience) {
      // Check audience of the token
      if (user.aud !== appConfig.rootURL) throw CustomException(403, 'You are not authorized to access this endpoint')
    }
    // Check allowed roles
    if (checks.allowedRoles) {
      const role = Array.isArray(user.role) ? user.role : [user.role]
      const allowed = role.filter(el => checks.allowedRoles.includes(el))
      if (!allowed.length) throw CustomException(403, 'You don\'t have enough permissions to access this endpoint')
    }
    // Check allowed scopes
    if (checks.allowedScopes) {
      const role = Array.isArray(user.scopes) ? user.scopes : [user.scopes]
      const allowed = role.filter(el => checks.allowedScopes.includes(el))
      if (!allowed.length) throw CustomException(403, 'You don\'t have enough permissions to access this endpoint')
    }
  }
  return next()
}
