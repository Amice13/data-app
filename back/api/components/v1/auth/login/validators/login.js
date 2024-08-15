const Joi = require('joi')
const passwordStrengthValidator = require('@api-components/passwords/validators/passwordStrengthValidator')

const body = Joi.object({
  email: Joi.string().
    email({ tlds: { allow: false }}).
    required().
    label('User Email').
    description('User email that was used for the authorization').
    messages({
      'string.empty': 'Email is a mandatory field',
      'string.base': 'Email is a mandatory field',
      'string.required': 'Email is a mandatory field',
      'string.email': 'You provided an invalid email'
    }),
  password: Joi.
    // Password is a string
    string().
    required().
    // Passwords must be at least eight characters long
    min(8).
    // Passwords must be short
    max(64).
    // Password must not contain cyryllic characters
    pattern(/^[^а-яєїґ]+$/i).
    // A space is allowed within a password (pass phrase) but must not be the first or last character
    pattern(/^[^ ].*[^ ]$/).
    custom(passwordStrengthValidator).
    label('User password').
    description('User password that was used for the authorization').
    messages({
      'string.empty': 'Password is a mandatory field',
      'string.base': 'Password is a mandatory field',
      'string.required': 'Password is a mandatory field',
      'string.pattern.base': 'Password must not contain Cyrillic characters and spaces in the beginning or the end',
      'any.custom': '{{#error.message}}'
    })
})

module.exports = {
  body
}
