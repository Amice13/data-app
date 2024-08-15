const getOrganization = require('./services/getOrganization')

const controller = async (req, res, next) => {
  try {
    // Return self to the user
    let result
    result = await getOrganization({ id: req.params.id })
    res.json(result)
    return next()
  } catch (err) {
    return next(err)
  }
  return next()
}

module.exports = controller
