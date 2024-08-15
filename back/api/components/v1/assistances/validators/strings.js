const Joi = require('joi')

const schema = Joi.object({
  key: Joi.string()
    .label('Key')
    .description('Unique identifier for the item'),
  value: Joi.string()
    .label('Text')
    .description('Text as an alternative type of a variable')
}).label('Item')
  .description('A single item with various properties')

module.exports = schema
