const Joi = require('joi')

const body = Joi.object({
  code: Joi.string().
    required().
    min(6).
    max(6).
    pattern(/^\d+$/i).
    label('One time password').
    description('Code provided by the user from Authenticator app').
    messages({
      'string.empty': 'Code is a mandatory field',
      'string.base': 'Code is a mandatory field',
      'string.required': 'Code is a mandatory field',
    })
})

module.exports = {
  body
}
