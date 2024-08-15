const getRequest = require('./services/getRequest')

const controller = async (req, res, next) => {
  try {
    let id = req.params.id
    let result = await getRequest({ id })
    res.json(result)
    return next()
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
