const setPassword = require('./services/setPasswordElastic')
const { appConfig } = require('@api-config')

const controller = async (req, res, next) => {
  try {
    // Get metadata
    const _userId = req.user.sub
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.headers?.['user-agent'] || ''
    const { reset, password } = req.body

    // Process user's data
    let result = await setPassword({ _userId, reset, ip, userAgent })

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
