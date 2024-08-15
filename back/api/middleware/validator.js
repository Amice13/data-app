// Get all validators
const { CustomException, configs, validators } = require('@api-helpers')

module.exports = (req, res, next) => {
  const validator = validators[req.key]?.[req.method.toLowerCase()]
  if (!validator) return next()
  if (validator.params) {
    const validated = validator.params.tailor(req.method.toLowerCase()).validate(req.params, { abortEarly: false })
    if (validated.error) throw validated.error
  }
  if (validator.query) {
    const validated = validator.query.tailor(req.method.toLowerCase()).validate(req.query, { abortEarly: false })
    if (validated.error) throw validated.error
  }
  if (validator.body) {
    if (validator.body.body) validator.body = validator.body.body
    const validated = validator.body.tailor(req.method.toLowerCase()).validate(req.body, { abortEarly: false })
    if (validated.error) throw validated.error
  }
  return next()
}
