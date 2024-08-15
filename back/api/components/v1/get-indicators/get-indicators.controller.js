const getIndicators = require('./services/get-indicators')

const controller = async (req, res, next) => {
  try {
    if (req.method === 'POST') {
      let result = await getIndicators(req.body)
      res.status(201).json(result)
      return res
    }
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
