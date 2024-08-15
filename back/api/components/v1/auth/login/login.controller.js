const login = require('./services/loginElastic')

const controller = async (req, res, next) => {
  try {
    // Get metadata
    const language = req.cookies.language || 'en'
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.headers?.['user-agent'] || ''

    // Process user's data
    let result = await login({ ...req.body, ip, userAgent, language })

    // Set authorization token
    if (result.setToken) {
      res.cookie('Authorization', result.setToken, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true
      })
      res.json(result.data)
      return res
    }
    return res
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
