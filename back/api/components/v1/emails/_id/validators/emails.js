const Joi = require('joi')

const params = Joi.object({
  _id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
})

module.exports = {
  params
}
