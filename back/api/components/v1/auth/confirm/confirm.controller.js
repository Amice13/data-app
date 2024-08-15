const confirm = require('./services/confirmElastic')

const controller = async (req, res, next) => {
  try {
    const { code } = req.body 
    let { password, token } = await confirm(code)
    res.json({
      messages: [{
        message: 'You successfully confirmed your email. Please, proceed to login page.'
      }]
    })
    return res
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
