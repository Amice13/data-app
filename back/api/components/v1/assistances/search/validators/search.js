const Joi = require('joi')

const body = Joi.object({
  query: Joi.object({
    'translation.uk._all': Joi.string().allow(''),
    'translation.uk.name': Joi.string().allow(''),
    'translation.uk.legalName': Joi.string().allow(''),
    _all: Joi.string().allow(''),
    name: Joi.string().allow(''),
    legalName: Joi.string().allow(''),
    code: Joi.string().allow('')
  }),
  filters: Joi.object({
    publicId: Joi.array().items(Joi.string()),
    status: Joi.array().items(Joi.string()),
    type: Joi.array().items(Joi.string()),
    functionalType: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string())
  }),
  sort: Joi.string(),
  sortOrder: Joi.string(),
  fields: Joi.array().items(Joi.string()),
  limit: Joi.number().max(100),
  offset: Joi.number().min(0)
})

module.exports = {
  body
}
