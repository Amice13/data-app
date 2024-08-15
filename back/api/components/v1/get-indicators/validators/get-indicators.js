const Joi = require('joi')

const body = Joi.object({
  organization: Joi.string(),
  bundleName: Joi.string()
})

module.exports = {
  body
}
