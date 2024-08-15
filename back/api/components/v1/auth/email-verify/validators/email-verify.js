const Joi = require('joi')
const { appConfig } = require('@api-config')

const body = Joi.object({
  code: Joi.string().
    required().
    min(appConfig.emailTokenComplexity).
    max(appConfig.emailTokenComplexity).
    pattern(/^\d+$/i).
    label('Email verification code').
    description('Code sent to the user to ensure the access to the email').
    messages({
      'string.empty': 'Code is a mandatory field',
      'string.base': 'Code is a mandatory field',
      'string.required': 'Code is a mandatory field',
    })
})

module.exports = {
  body
}
