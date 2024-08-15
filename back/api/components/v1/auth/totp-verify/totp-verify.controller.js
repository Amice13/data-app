const verifyTotp = require('./services/verifyTotpElastic')
const { appConfig } = require('@api-config')

const controller = async (req, res, next) => {
  try {
    // Get metadata
    const _userId = req.user.sub
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.headers?.['user-agent'] || ''
    const { code } = req.body

    // Process user's data
    let result = await verifyTotp({ _userId, code, ip, userAgent })

    // Set token
    if (result.setToken) {
      res.cookie(result.tokenType, result.setToken, {
        maxAge: result.grantAccess ?  appConfig.refreshTokenDuration : 5 * 60,
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
