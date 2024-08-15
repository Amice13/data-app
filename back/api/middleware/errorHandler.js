// Logger definition
const logger = require('@api-logger')

const errorHandler = (err, req, res, next) => {
  if (!err) return next()
  // Output to the logs
  logger.error(`error: ${err.message}, ${err.stack}`)
  // Format validation errors
  if (err.details) {
    return res.status(422).json({
      status: err.code ? 'fail' : 'error',
      data: { errors: err.details }
    })
  }
  // Send the properly formatted response
  const message = err.message ? err.message.replace(/ValidationError: /, '') : ''
  return res.status(err.code || 500).json({
    status: err.code ? 'fail' : 'error',
    data: { errors: [{ message: message || 'Server error. Please try again later.' }] }
  })
}

module.exports = errorHandler
