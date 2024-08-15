const Joi = require('joi')

// Schema definition
const body = Joi.object({
  taxId: Joi.array()
    .items(Joi.string())
    .label('Tax ID')
    .description('Tax ID of the person to check'),
  bundleName: Joi.string()
    .label('Bundle name')
    .description('Type of the assistance provided to the person')
})

module.exports = {
  body
}
