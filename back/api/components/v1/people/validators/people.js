const Joi = require('joi')
const vulnerability = require('./vulnerabilities')
const taxIdValidator = require('./taxIdValidator')
const passportValidator = require('./passportValidator')

// Translation
const translationDetails = Joi.object({
  fullName: Joi.string()
    .label('Full Name')
    .description('Full name of the person'),
  familyName: Joi.string()
    .label('Family Name')
    .description('Family name of the person'),
  givenName: Joi.string()
    .label('Given Name')
    .description('Given name of the person'),
  additionalName: Joi.string()
    .allow(null, '')
    .label('Additional Name')
    .description('Additional name of the person')
})

const translation = Joi.object()
  .pattern(/^([a-z]{2})$/, translationDetails)
  .description('The list of translations')

const body = Joi.object({
  id: Joi.string()
    .label('UID')
    .description('Unique identifier of the person'),
  taxId: Joi.string()
    .min(10)
    .max(10)
    .custom(taxIdValidator)
    .label('Tax ID')
    .description('Tax identification number'),
  noTaxId: Joi.boolean()
    .label('No Tax ID')
    .description('Indicator if the person has no tax ID'),
  noDocuments: Joi.boolean()
    .label('No documents')
    .description('Indicator if the person has no documents at all'),
  passport: Joi.string()
    .custom(passportValidator)
    .label('Passport')
    .description('Passport number'),
  populationType: Joi.string()
    .label('Population Type')
    .description('Type of population'),
  fullName: Joi.string()
    .label('Full Name')
    .description('Full name of the person'),
  familyName: Joi.string()
    .label('Family Name')
    .description('Family name of the person'),
  givenName: Joi.string()
    .label('Given Name')
    .description('Given name of the person'),
  additionalName: Joi.string()
    .allow(null, '')
    .label('Additional Name')
    .description('Additional name of the person'),
  gender: Joi.string()
    .valid('Male', 'Female')
    .label('Gender')
    .description('Gender of the person'),
  birthday: Joi.date().iso()
    .less('now')
    .label('Birthday')
    .description('Birthday of the person'),
  age: Joi.number()
    .integer()
    .label('Age')
    .description('Age of the person'),
  origin: Joi.string(),
  vulnerability,
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
}).label('Person details')

module.exports = { body, translationDetails }