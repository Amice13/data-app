const Joi = require('joi')

// Schema definition
const body = Joi.object({
  search: Joi.string()
    .description('Search string to find a tag by the name'),
  entity: Joi.string()
    .description('Collection, table or index to filter tags')
})

module.exports = {
  body
}
