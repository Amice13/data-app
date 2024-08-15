const Joi = require('joi')

const body = Joi.object({
  path: Joi.string()
    .label('Path')
    .min(2)
    .description('Path of the file to delete'),
})

module.exports = {
  body
}
