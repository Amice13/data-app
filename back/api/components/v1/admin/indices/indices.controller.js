const getIndices = require('./services/getIndices')

const controller = async (req, res, next) => {
  try {
    const indices = await getIndices()
    res.json(indices)
    return res
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
