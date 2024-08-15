const search = require('./services/search')

const controller = async (req, res, next) => {
  try {
    if (req.method === 'POST') {
      req.body.user = req.user
      let result = await search(req.body)
      res.status(200).json(result)
      return res
    }
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
