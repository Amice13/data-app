const getAssistance = require('./services/getAssistance')

const controller = async (req, res, next) => {
  try {
    let id = req.params.id
    let result = await getAssistance({ id })
    res.json(result)
    return next()
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
