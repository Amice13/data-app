const Joi = require('joi')
const address = require('@api-components/addresses/validators/addresses')
const collectiveCenter = require('@api-components/assistances/validators/collectiveCenters')
const file = require('@api-components/files/validators/files')
const familyStats = require('@api-components/assistances/validators/familyStats')
const organization = require('@api-components/organizations/validators/organizations')

const addressTranslation = address.translationDetails
const organizationTranslation = organization.translationDetails
const collectiveCenterTranslation = collectiveCenter.translationDetails

// Translation
const translationDetails = Joi.object({
  address: addressTranslation,
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
    .label('Date')
    .description('The date when the assistance was provided'),
  month: Joi.string()
    .label('Month in form YYYY-MM')
    .description('Month when the assistance was provided'),
  bundleName: Joi.string()
    .label('Bundle Name')
    .description('The name of the assistance bundle'),
  aor: Joi.string()
    .label('AOR')
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
  buildings: Joi.number()
    .integer()
    .label('Buildings')
    .description('Number of buildings assisted'),
  households: Joi.number()
    .integer()
    .label('Households')
    .description('Number of households assisted'),
  individuals: Joi.number()
    .integer()
    .label('Individuals')
    .description('Number of individuals assisted'),
  familyStats,
  address: address.body,
  collectiveCenter,
  responsibleOrganization: organization.body
    .label('Responsible Organization')
    .description('Organization responsible for the assistance'),
  organization: organization.body
    .label('Organization')
    .description('Implementing organization'),
  tags: Joi.array()
    .items(Joi.string())
    .label('Tags')
    .description('Custom tags'),
  metadata: Joi.object()
    .label('Metadata')
    .description('Additional metadata associated with the record'),
  updatedBy: Joi.string()
    .label('Updated By')
    .description('Identifier of the user who last updated this record'),
  updatedByEmail: Joi.string()
    .email({ tlds: { allow: false } })
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
