const initialize = require('./services/initializeElastic')

const controller = async (req, res, next) => {
  try {
    const language = req.cookies.language || 'en'
    let { password, token } = await initialize({ body: req.body, language })
    // res.cookie('Authorization', `Bearer ${token}`, { httpOnly: true, sameSite: 'none', secure: true })
    res.json({ messages: [
      { message: 'Admin user is successfully created. You will receive the letter to confirm your email.' },
      { message: 'Please, save your password to log in. It will not be shown again:' },
      { message: password }
    ]})
    return res
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
