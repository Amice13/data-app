const Joi = require('joi')

// Schema definition
const body = Joi.object({
  search: Joi.string()
    .label('Search query')
    .description('Search string to find an entity by the field'),
  entity: Joi.string()
    .label('Entity')
    .description('Collection, table or index to find an entity'),
  field: Joi.string()
    .label('Search field')
    .description('Field to query'),
  fields: Joi.array()
    .items(Joi.string()
      .label('Fields')
      .description('List of fields provided to the user')
    )
})

module.exports = {
  body
}
