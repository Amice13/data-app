const Joi = require('joi')

// Translation
const translationDetails = Joi.object({
  name: Joi.string()
    .label('Name')
    .description('Name of collective center'),
})

const translation = Joi.object()
  .pattern(/^([a-z]{2})$/, translationDetails)
  .description('The list of translations')

// Schema definition
const schema = Joi.object({
  name: Joi.string()
    .label('Name')
    .description('Name of the collective center'),
  code: Joi.string()
    .label('Code')
    .description('Code of the collective center'),
  translation
})

module.exports = schema
module.exports.translationDetails = translationDetails
