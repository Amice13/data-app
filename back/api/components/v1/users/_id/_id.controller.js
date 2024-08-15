const getUser = require('./services/getUser')

const controller = async (req, res, next) => {
  try {
    let result
    let id = req.params.id === 'me' ? req.user.sub : req.params.id
    result = await getUser({ id })
    res.json(result)
    return next()
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
