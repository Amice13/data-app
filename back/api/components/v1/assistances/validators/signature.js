const Joi = require('joi')

const pointSchema = Joi.object({
  time: Joi.number().integer(),
  x: Joi.number(),
  y: Joi.number(),
  pressure: Joi.number()
});

const schema = Joi.object({
  penColor: Joi.string(),
  dotSize: Joi.number(),
  minWidth: Joi.number(),
  maxWidth: Joi.number(),
  velocityFilterWeight: Joi.number().min(0),
  compositeOperation: Joi.string(),
  points: Joi.array().items(pointSchema)
})

module.exports = schema
