const Joi = require('joi')

// Schema definition
const schema = Joi.object({
  type: Joi.string()
    .valid('Point')
    .description('Type of geographical object'),
  accuracy: Joi.number()
    .label('Accuracy')
    .description('Accuracy of geocoding in meters'),
  coordinates: Joi.array()
    .items(Joi.number().description('Array with longitude and latitude'))
  })
    .description('Geopoint of the location')

module.exports = schema
