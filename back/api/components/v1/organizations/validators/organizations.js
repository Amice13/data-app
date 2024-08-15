const Joi = require('joi')
const file = require('@api-components/files/validators/files.js')
const address = require('@api-components/addresses/validators/addresses.js')
const addressTranslation = address.translationDetails

// Translation
const translationDetails = Joi.object({
  name: Joi.string()
    .label('Organization name')
    .description('Name of the organization'),
  legalName: Joi.string()
    .label('Full name of the organization')
    .description('Full name of the organization according to the documents'),
  description: Joi.string()
    .label('Description')
    .description('Description of the organization'),
  address: addressTranslation
})

const translation = Joi.object()
  .pattern(/^([a-z]{2})$/, translationDetails)
  .description('The list of translations')

const body = Joi.object({
  id: Joi.string()
    .label('UUID')
    .description('UUID of the organization'),
  code: Joi.string()
    .required()
    .label('Organization code')
    .description('Unique code of the organization'),
  name: Joi.string()
    .required()
    .label('Organization name')
    .description('Short name of the organization'),
  status: Joi.string()
    .allow(null, '')
    .label('Current status')
    .description('Status of the organization'),
  description: Joi.string()
    .allow(null, '')
    .label('Description')
    .description('Description of the organization'),
  legalName: Joi.string()
    .allow(null, '')
    .label('Full name of the organization')
    .description('Full name of the organization according to the documents'),
  type: Joi.string()
    .allow(null, '')
    .label('Organization type')
    .description('Type of the organization (OCHA classification)'),
  functionalType: Joi.string()
    .label('Organization functional type')
    .description('Functional type of the organization'),
  address: address.body,
  logo: Joi.array().max(1).items(file.body),
  email: Joi.array()
    .items(Joi.string()
      .email({ tlds: { allow: false }})
      .allow(null, '')
      .label('Email')
      .description('Email address of the organization')
    ),
  phone: Joi.array()
    .items(Joi.string()
      .allow(null, '')
      .label('Phone')
      .description('Phone number of the organization')
    ),
  website: Joi.array()
    .items(Joi.string()
      .allow(null, '')
      .label('Website')
      .description('Website of the organization')
    ),
  tags: Joi.array()
    .items(Joi.string()),
  createdBy: Joi.string()
    .label('Created by')
    .description('User who created the record'),
  updatedBy: Joi.string()
    .label('Updated by')
    .description('User who last updated the record'),
  createdAt: Joi.string().isoDate()
    .label('Created at')
    .description('Creation date of the record'),
  updatedAt: Joi.string().isoDate()
    .label('Updated at')
    .description('Last update date of the record'),
  translation
}).description('Organization details')

module.exports = { body, translationDetails }
