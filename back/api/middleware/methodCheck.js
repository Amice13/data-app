const { configs, CustomException } = require('@api-helpers')

module.exports = (req, res, next) => {
  // Get the relevant config
  const config = configs[req.key]
  const allowedMethods = Object.keys(config.methods)
  if (!allowedMethods.includes(req.method.toLowerCase())) {
    throw CustomException(405, 'This method is not allowed')
  }
  return next()
}
