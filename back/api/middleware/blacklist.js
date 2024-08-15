const { blacklist } = require('@api-services')
const { configs, CustomException } = require('@api-helpers')

module.exports = (req, res, next) => {
  const checks = configs[req.key].methods[req.method.toLowerCase()]
  if (!checks?.isProtectedRoute || !checks.checkAccessToken) return next()
  const token = req.headers.authorization.split(/ /)[1]
  if (blacklist.has(token)) throw CustomException(401, 'Your session is expired')
  return next()
}
