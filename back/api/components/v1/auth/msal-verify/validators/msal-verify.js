const Joi = require('joi')
const { appConfig } = require('@api-config')

const body = Joi.object({
  token: Joi.string().
    required().
    label('MSAL Token').
    description('Authorization token issued by Microsoft Entra').
    messages({
      'string.empty': 'MSAL token is mandatory',
      'string.base': 'MSAL token is mandatory',
      'string.required': 'MSAL token is mandatory',
    })
})

module.exports = {
  body
}
