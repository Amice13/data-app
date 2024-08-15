const verifyMsal = require('./services/verifyMsalElastic')
const { appConfig } = require('@api-config')

const controller = async (req, res, next) => {
  try {
    // Get metadata
    const { token } = req.body
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.headers?.['user-agent'] || ''

    // Process user's data
    let result = await verifyMsal({ token, ip, userAgent })

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
