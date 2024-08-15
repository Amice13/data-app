const getTags = require('./services/getTags')

const controller = async (req, res, next) => {
  try {
    if (req.method === 'POST') {
      let result = await getTags(req.body)
      res.status(200).json(result)
      return res
    }
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
