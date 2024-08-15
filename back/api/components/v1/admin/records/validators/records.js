const Joi = require('joi')

const body = Joi.object({
  index: Joi.string(),
  query: Joi.string(),
  size: Joi.number().max(100),
  from: Joi.number().min(0),
  filters: Joi.object({}),
  sort: Joi.object({
    key: Joi.string(),
    mode: Joi.string().valid('asc', 'desc')
  }),
  start: Joi.date(),
  end: Joi.date()
})

module.exports = {
  body
}
