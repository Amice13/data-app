const getRecords = require('./services/getRecords')

const controller = async (req, res, next) => {
  try {
    const records = await getRecords(req.body)
    res.json(records.hits)
    return res
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
