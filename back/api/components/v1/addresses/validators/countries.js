const Joi = require('joi')

// Schema definition
const schema = Joi.object({
  name: Joi.string()
    .description('Name of the country'),
  code2: Joi.string()
    .regex(/^[A-Z]{2}$/)
    .description('2-letters country code'),
  code3: Joi.string()
    .regex(/^[A-Z]{3}$/)
    .description('3-letters country code'),
  code: Joi.string()
    .regex(/^\d+$/)
    .description('Digit country code')
})

module.exports = schema
