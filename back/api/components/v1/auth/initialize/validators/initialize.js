const Joi = require('joi')

const body = Joi.object({
  email: Joi.string().
    email().
    required().
    label('User Email').
    description('User email that was used for the authorization').
    messages({
      'string.empty': 'Email is a mandatory field',
      'string.base': 'Email is a mandatory field',
      'string.required': 'Email is a mandatory field',
      'string.email': 'You provided an invalid email'
    })
  })

module.exports = {
  body
}
