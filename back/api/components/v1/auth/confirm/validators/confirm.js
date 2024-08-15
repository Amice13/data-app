const Joi = require('joi')

const body = Joi.object({
  code: Joi.string().
    min(32).
    max(32).
    required().
    label('Code').
    description('Code of the token to confirm the email').
    messages({
      'string.empty': 'The confirmation code is not provided',
      'string.base': 'The confirmation code is not provided',
      'string.required': 'The confirmation code is not provided',
      'string.email': 'The confirmation code is not provided'
    })
  })

module.exports = {
  body
}
