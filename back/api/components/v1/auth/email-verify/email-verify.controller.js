const verifyEmail = require('./services/verifyEmailElastic')

const controller = async (req, res, next) => {
  try {
    // Get metadata
    const _userId = req.user.sub
    const language = req.cookies.language || 'en'
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.headers?.['user-agent'] || ''

    // Process user's data
    let result = await verifyEmail({ ...req.body, _userId, ip, userAgent, language })

    // // Set token
    // if (result.setToken) {
    //   res.cookie(result.tokenType, result.setToken, {
    //     maxAge: 5 * 60,
    //     httpOnly: true,
    //     sameSite: 'none',
    //     secure: true
    //   })
    //   res.json(result.data)
    //   return res
    // }
    return res.json({ messages: [
      { message: 'Shit!' }
    ]})
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
