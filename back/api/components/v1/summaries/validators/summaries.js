const Joi = require('joi')
const person = require('@api-components/people/validators/people')
const familyMembers = require('@api-components/assistances/validators/familyMembers')
const address = require('@api-components/addresses/validators/addresses')
const collectiveCenter = require('@api-components/assistances/validators/collectiveCenters')
const file = require('@api-components/files/validators/files')
const items = require ('@api-components/assistances/validators/items')
const objectives = require ('@api-components/assistances/validators/objectives')
const familyStats = require('@api-components/assistances/validators/familyStats')
const organization = require('@api-components/organizations/validators/organizations')

const addressTranslation = address.translationDetails
const organizationTranslation = organization.translationDetails
const personTranslation = person.translationDetails
const collectiveCenterTranslation = collectiveCenter.translationDetails

// Translation
const translationDetails = Joi.object({
  address: addressTranslation,
  fundedBy: organizationTranslation,
  responsibleOrganization: organizationTranslation,
  organization: organizationTranslation,
  receivingOrganization: organizationTranslation,
  collectiveCenter: collectiveCenterTranslation,
  focalPoint: personTranslation
})

const translation = Joi.object()
  .pattern(/^([a-z]{2})$/, translationDetails)
  .description('The list of translations')

const body = Joi.object({
  isCalculated: Joi.boolean()
    .label('Is Calculated')
    .description('Indicates if the summary is created by a script'),  
  isDonation: Joi.boolean()
    .label('Is Donation')
    .description('Indicates if the summary is a donation'),
  date: Joi.string()
    .isoDate()
    .label('Date')
    .description('The date of the assistance'),
  objectives,
  bundleName: Joi.string()
    .label('Bundle Name')
    .description('The name of the bundle'),
  publicId: Joi.string()
    .label('Public ID')
    .description('The public identifier for aggregation'),
  aor: Joi.string()
    .label('AOR')
    .description('Area of Responsibility for quick aggregations'),

  distributionType: Joi.string()
    .label('Distribution Type')
    .description('The type of distribution'),
  distributionModality: Joi.string()
    .label('Distribution Modality')
    .description('The modality of distribution'),
  populationType: Joi.string()
    .label('Population Type')
    .description('The type of population'),

  buildings: Joi.number().integer()
    .label('Building')
    .description('Number of buildings assisted'),
  households: Joi.number().integer()
    .label('Households')
    .description('Number of households assisted'),
  individuals: Joi.number().integer()
    .label('Individuals')
    .description('Number of individuals assisted'),

  items: Joi.array()
    .items(items),

  familyStats,
  address: address.body,
  collectiveCenter,

  fundedBy: organization.body
    .label('Organization funded the assistance')
    .description('Organization responsible for the assistance'),
  responsibleOrganization: organization.body
    .label('Partner organization')
    .description('Organization responsible for the assistance'),
  organization: organization.body
    .label('Organization')
    .description('Implementing organization'),
  receivingOrganization: organization.body
    .label('Receiving organization')
    .description('Organization receiving the donation'),
  focalPoint: person.body
    .label('Focal point')
    .description('Focal point or the receiving organization'),
  files: Joi.array()
    .items(file.body),
  totalPrice: Joi.number()
    .integer()
    .label('Total Price')
    .description('Total price of the assistance in cents'),
  comment: Joi.string()
    .label('Comment')
    .description('Comment about the record'),
  metadata: Joi.object()
    .label('Metadata')
    .description('Additional metadata associated with the record'),
  createdBy: Joi.string()
    .label('Created By')
    .description('Identifier of the user who created this record'),
  createdByEmail: Joi.string()
    .email({ tlds: { allow: false }})
    .label('Created by email')
    .description('Email of the user who created this record'),
  updatedBy: Joi.string()
    .label('Updated By')
    .description('Identifier of the user who last updated this record'),
  updatedByEmail: Joi.string()
    .email({ tlds: { allow: false }})
    .label('Updated by email')
    .description('Email of the user who updated this record'),
  createdAt: Joi.string()
    .isoDate()
    .label('Created At')
    .description('Creation date of the record'),
  updatedAt: Joi.string()
    .isoDate()
    .label('Updated At')
    .description('Last updated date of the record'),
  translation,
})

module.exports = { body }
