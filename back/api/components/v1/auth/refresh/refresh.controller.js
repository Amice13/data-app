const refreshToken = require('./services/refreshTokenElastic')
const { appConfig } = require('@api-config')

const controller = async (req, res, next) => {
  try {
    // Get metadata
    const _userId = req.user.sub
    const version = req.user.version
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.headers?.['user-agent'] || ''
    const { Authorization } = req.cookies
    const token = Authorization

    // Process user's data
    let result = await refreshToken({ _userId, version, token, ip, userAgent })

    // Set token
    if (result.setToken) {
      res.cookie(result.tokenType, result.setToken, {
        maxAge: appConfig.refreshTokenDuration,
        httpOnly: true,
        sameSite: 'none',
        secure: true
      })
      res.json(result.data)
      return res
    }
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
