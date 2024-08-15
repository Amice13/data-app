const Joi = require('joi')
const country = require('./countries.js')
const location = require('./locations.js')

// Translation
const translationDetails = Joi.object({
  fullAddress: Joi.string()
    .label('Full address')
    .description('Address name for a quick lookup'),
  street: Joi.string()
    .label('Street name')
    .description('The name of the street associated with the address'),
  building: Joi.string()
    .label('Building number')
    .description('The house number of the address')
})

const translation = Joi.object()
  .pattern(/^([a-z]{2})$/, translationDetails)
  .description('The list of translations')

// Schema definition
const body = Joi.object({
  id: Joi.string()
    .label('UUID')
    .description('The address unique identifier'),
  householdId: Joi.string()
    .label('Tax ID of the head of the household')
    .description('OpenStreetMap place_id'),
  osmId: Joi.string()
    .label('OSM ID')
    .description('OpenStreetMap place_id'),
  stateId: Joi.string()
    .label('State ID')
    .description('UUID assigned by the state where assistance is provided'),
  sidarId: Joi.string()
    .label('SIDAR ID')
    .description('Identifier of the address in SIDAR app'),
  type: Joi.string()
    .label('Address type')
    .description('Address type for indicating the households'),
  name: Joi.string()
    .label('Name of the address')
    .description('Arbitrary address name for a quick lookup'),
  fullAddress: Joi.string()
    .label('Full address')
    .description('Address name for a quick lookup'),
  country,
  admin1: Joi.string()
    .label('First level administrative division')
    .description('The name of the first level of the territory'),
  admin2: Joi.string()
    .label('Second level administrative division')
    .description('The name of the second level of the territory'),
  admin3: Joi.string()
    .label('Third level administrative division')
    .description('The name of the third level of the territory'),
  admin4: Joi.string()
    .label('Fourth level administrative division')
    .description('The name of the fourth level of the territory'),
  pCode1: Joi.string()
    .label('Code of the first level administrative division')
    .description('the code representing the first level of geographic identification (p-code 1)'),
  pCode2: Joi.string()
    .label('Code of the second level administrative division')
    .description('the code representing the second level of geographic identification (p-code 2)'),
  pCode3: Joi.string()
    .label('Code of the third level administrative division')
    .description('the code representing the third level of geographic identification (p-code 3)'),
  pCode4: Joi.string()
    .label('Code of the fourth level administrative division')
    .description('the code representing the fourth level of geographic identification (p-code 4)'),
  street: Joi.string()
    .label('Street name')
    .description('The name of the street associated with the address'),
  streetType: Joi.string()
    .label('Street type')
    .description('The name of the street associated with the address in Ukrainian'),
  building: Joi.string()
    .label('Building number')
    .description('The house number of the address'),
  block: Joi.string()
    .label('Block number')
    .description('The block in the house address'),
  apartment: Joi.string()
    .label('Apartment number')
    .description('The apartment number'),
  location,
  tags: Joi.array()
    .items(Joi.string()),
  createdAt: Joi.string()
    .isoDate()
    .label('Created by')
    .description('The date when the address entry was created in the table'),
  updatedAt: Joi.string()
    .isoDate()
    .label('Updated by')
    .description('The date when the address was updated'),
  createdBy: Joi.string()
    .label('Created at')
    .description('The identifier of the user who added the address'),
  updatedBy: Joi.string()
    .label('Updated at')
    .description('The identifier of the user who updated the address'),
  translation
})

module.exports = { body, translationDetails }
