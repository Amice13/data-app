const Joi = require('joi')

// Schema definition
const schema = Joi.object({
  name: Joi.string()
    .label('Name')
    .description('Name of the vulnerability'),
  vulnerabilitySpecified: Joi.string()
    .label('Vulnerability specified')
    .description('Detailed name of the vulnerability'),
  code: Joi.string()
    .label('Code')
    .regex(/^[A-Z]{2}$/)
    .description('2-letters code of the vulnerability')
})

module.exports = schema
