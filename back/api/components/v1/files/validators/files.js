const Joi = require('joi')

const body = Joi.object({
  id: Joi.string()
    .label('UUID')
    .description('UUID of the file'),
  name: Joi.string()
    .label('Filename')
    .description('User defined filename'),
  path: Joi.string()
    .label('Path')
    .description('Place where the file is stored'),
  description: Joi.string()
    .label('File description')
    .description('Comment to the file content'),
  size: Joi.number()
    .integer()
    .label('File size')
    .description('File size in bytes'),
  base64: Joi.string()
    .label('Base64 file')
    .description('Base64 encoded file'),
  mimeType: Joi.string()
    .label('File mimetype')
    .description('File mimetype'),
  orphaned: Joi.boolean()
    .label('Orphaned')
    .description('Indicator if the file is orphaned'),
  createdAt: Joi.string().isoDate()
    .label('Created at')
    .description('Date when the file was uploaded'),
  createdBy: Joi.string()
    .label('Created by')
    .description('ID of the user who uploaded the file'),
  category: Joi.string()
    .label('File category')
    .description('File category for filtering')
})

module.exports = { body }
