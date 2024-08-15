const Joi = require('joi')

const schema = Joi.object({
  key: Joi.string()
    .label('Key')
    .description('Unique identifier for the item'),
  value: Joi.number()
    .min(0)
    .max(500)
    .label('Value')
    .description('Value associated with the item'),
  price: Joi.number()
    .min(0)
    .max(1000000)
    .label('Price')
    .description('Price of the item in cents'),
  boolean: Joi.boolean()
    .label('Boolean Flag')
    .description('Boolean flag as an alternative type of a variable'),
  text: Joi.string()
    .label('Text')
    .description('Text as an alternative type of a variable')
}).label('Item')
  .description('A single item with various properties')

module.exports = schema
