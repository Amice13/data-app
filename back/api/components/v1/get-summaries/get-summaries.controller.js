const getSummary = require('./services/get-summary')

const controller = async (req, res, next) => {
  try {
    if (req.method === 'POST') {
      let result = await getSummary(req.body)
      res.status(201).json(result)
      return res
    }
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
