const Joi = require('joi')

const globalAlter = {
  get: schema => schema.optional(),
  post: schema => schema.required(),
  put: schema => schema.optional(),
  delete: schema => schema.optional()
}

const query = Joi.object({

})

const params = Joi.object({
  
})

const body = Joi.object({
  _id: Joi.string()
    .description('The address unique identifier'),
  name: Joi.string()
    .description('Address name for a quick lookup'),
  countryCode: Joi.string()
    .alter(globalAlter)
    .regex(/^[A-Z]{2}$/)
    .description('2-digit country code'),
  country: Joi.string()
    .description('Name of the country'),
  aor: Joi.string()
    .alter(globalAlter)
    .description('Area of responsibility for summarizing the data and limiting the users'),
  admin1: Joi.string()
    .description('The name of the first level of the territory'),
  admin2: Joi.string()
    .description('The name of the second level of the territory'),
  admin3: Joi.string()
    .description('The name of the third level of the territory'),
  admin4: Joi.string()
    .description('The name of the fourth level of the territory'),
  pCode1: Joi.string()
    .alter(globalAlter)
    .description('the code representing the first level of geographic identification (p-code 1)'),
  pCode2: Joi.string()
    .alter(globalAlter)
    .description('the code representing the second level of geographic identification (p-code 2)'),
  pCode3: Joi.string()
    .alter(globalAlter)
    .description('the code representing the third level of geographic identification (p-code 3)'),
  pCode4: Joi.string()
    .alter(globalAlter)
    .description('the code representing the fourth level of geographic identification (p-code 4)'),
  street: Joi.string()
    .alter(globalAlter)
    .description('The name of the street associated with the address'),
  streetType: Joi.string()
    .alter(globalAlter)
    .description('The name of the street associated with the address in Ukrainian'),
  building: Joi.string()
    .alter(globalAlter)
    .description('The house number of the address'),
  block: Joi.string()
    .description('The block in the house address'),
  apartment: Joi.string()
    .description('The apartment number'),
  location: Joi.object({
    type: Joi.string()
      .valid('Point')
      .description('Type of geographical object'),
    coordinates: Joi.array()
      .items(Joi.number().description('Array with longitude and latitude')),
    })
    .description('Geopoint of the location'),
  accessedBy: Joi.array()
    .items(Joi.string().description('The organization ID')),
  createdAt: Joi.string()
    .isoDate()
    .description('The date when the address entry was created in the table'),
  updatedAt: Joi.string()
    .isoDate()
    .description('The date when the address was updated'),
  createdBy: Joi.string()
    .description('The identifier of the user who added the address'),
  createdByAor: Joi.string()
    .description('AOR of the user created this file'),
  createdByOrganization: Joi.string()
    .description('The identifier of the organization which created the address'),
  updatedBy: Joi.string()
    .description('The identifier of the user who updated the address'),
  translation: Joi.object()
    .pattern(/^([a-z]{2})$/, Joi.object())
    .description('The list of translations')
})

module.exports = {
  body,
  params,
  query
}
