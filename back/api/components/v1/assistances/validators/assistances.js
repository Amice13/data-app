const Joi = require('joi')
const person = require('@api-components/people/validators/people')
const familyMembers = require('./familyMembers')
const address = require('@api-components/addresses/validators/addresses')
const collectiveCenter = require('./collectiveCenters')
const items = require('./items')
const strings = require('./strings')
const familyStats = require('./familyStats')
const objectives = require('./objectives')
const signature = require('./signature')
const organization = require('@api-components/organizations/validators/organizations')
const addressTranslation = address.translationDetails
const organizationTranslation = organization.translationDetails
const personTranslation = person.translationDetails
const collectiveCenterTranslation = collectiveCenter.translationDetails

const globalAlter = {
  post: schema => schema.required(),
  put: schema => schema.optional()
}

const idAlter = {
  post: schema => schema.optional(),
  put: schema => schema.required()
}

// Translation
const translationDetails = Joi.object({
  headOfHousehold: personTranslation,
  address: addressTranslation,
  household: addressTranslation,
  fundedBy: organizationTranslation,
  responsibleOrganization: organizationTranslation,
  organization: organizationTranslation,
  collectiveCenter: collectiveCenterTranslation
})

const translation = Joi.object()
  .pattern(/^([a-z]{2})$/, translationDetails)
  .description('The list of translations')

const body = Joi.object({
  date: Joi.string()
    .isoDate()
    .alter(idAlter)
    .label('Date of the assistance')
    .description('The date when the assistance was provided'),
  householdId: Joi.string()
    .label('Household ID')
    .description('Contains the tax ID number of the first household representative'),
  familyMembersIds: Joi.array()
    .items(Joi.string())
    .label('Family members IDs')
    .description('List of all family members IDs, following the pattern [sex]-[age group]-[household Id]-[age]-[tax id or uid]'),
  objectives,
  bundleName: Joi.string()
    .label('Bundle Name')
    .description('The name of the assistance bundle'),
  publicId: Joi.string()
    .label('Public ID')
    .description('The public identifier for aggregation'),
  aor: Joi.string()
    .label('Area of responsibility')
    .description('Area of responsibility for quick aggregations'),
  distributionType: Joi.string()
    .label('Distribution Type')
    .description('The type of distribution'),
  distributionModality: Joi.string()
    .label('Distribution Modality')
    .description('The modality of distribution'),
  populationType: Joi.string()
    .label('Population Type')
    .description('The type of population'),

  headOfHousehold: person.body,
  familyMembers: Joi.array()
    .items(familyMembers),

  address: address.body,
  household: address.body,
  collectiveCenter,

  items: Joi.array()
    .items(items),
  strings: Joi.array()
    .items(items),

  familyStats,
  fundedBy: organization.body,
  responsibleOrganization: organization.body,
  organization: organization.body,

  totalPrice: Joi.number()
    .integer()
    .min(0)
    .label('Total price')
    .description('Total price of the items'),

  comment: Joi.string()
    .label('Comment')
    .description('Comment about the record'),

  duplicated: Joi.boolean()
    .label('Duplicated')
    .description('Indicates if the record is duplicated'),

  groupId: Joi.string()
    .label('Group ID')
    .description('ID of the group for progress tracking'),

  signature: Joi.array()
    .items(signature)
    .label('Signature')
    .description('Signature field, currently not enabled'),

  metadata: Joi.object()
    .label('Metadata')
    .description('Additional metadata associated with the record'),

  createdBy: Joi.string()
    .label('Created By')
    .description('Identifier of the user who created this record'),

  createdByEmail: Joi.string()
    .email({ tlds: { allow: false }})
    .label('Created By Email')
    .description('Email of the user who created this record'),

  value: Joi.number()
    .integer()
    .min(0)
    .label('Value')
    .description('RAIS data value'),

  currency: Joi.string()
    .label('Currency')
    .description('Currency of the RAIS data'),

  frequency: Joi.number()
    .integer()
    .min(1)
    .label('Frequency')
    .description('Frequency of the RAIS data'),

  attendedFrom: Joi.string()
    .isoDate()
    .label('Attended From')
    .description('Start date of attendance RAIS'),

  attendedTo: Joi.string()
    .isoDate()
    .label('Attended To')
    .description('End date of attendance RAIS'),

  tags: Joi.array()
    .items(Joi.string()),

  updatedBy: Joi.string()
    .label('Updated By')
    .description('Identifier of the user who last updated this record'),

  updatedByEmail: Joi.string()
    .email({ tlds: { allow: false }})
    .label('Updated By Email')
    .description('Email of the user who updated this record'),

  createdAt: Joi.string()
    .isoDate()
    .label('Created At')
    .description('Creation date of the record'),

  updatedAt: Joi.string()
    .isoDate()
    .label('Updated At')
    .description('Last updated date of the record'),

  translation
})

module.exports = { body }
