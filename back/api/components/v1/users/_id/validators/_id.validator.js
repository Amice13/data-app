const Joi = require('joi')

const params = Joi.object({
  _id: Joi.string().required()
})

module.exports = {
  params
}
