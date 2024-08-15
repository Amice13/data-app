const Joi = require('joi')
const address = require('@api-components/addresses/validators/addresses')
const collectiveCenter = require('@api-components/assistances/validators/collectiveCenters')
const items = require('@api-components/assistances/validators/items')
const objectives = require('@api-components/assistances/validators/objectives')
const familyStats = require('@api-components/assistances/validators/familyStats')
const organization = require('@api-components/organizations/validators/organizations')
const user = require('@api-components/users/validators/users')
const addressTranslation = address.translationDetails
const organizationTranslation = organization.translationDetails
const collectiveCenterTranslation = collectiveCenter.translationDetails

// Translation
const translationDetails = Joi.object({
  address: addressTranslation,
  fundedBy: organizationTranslation,
  responsibleOrganization: organizationTranslation,
  collectiveCenter: collectiveCenterTranslation
})

const translation = Joi.object()
  .pattern(/^([a-z]{2})$/, translationDetails)
  .description('The list of translations')

const body = Joi.object({
  date: Joi.string()
    .isoDate()
    .label('Date of the assistance')
    .description('The date when the assistance was provided'),
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
  address: address.body,
  collectiveCenter,
  items: Joi.array()
    .items(items),
  organization: organization.body,
  responsibleOrganization: organization.body,
  fundedBy: organization.body,
  status: Joi.string(),
  assignees: Joi.array()
    .items(user.body),
  comment: Joi.string()
    .label('Comment')
    .description('Comment about the record'),
  metadata: Joi.object()
    .label('Metadata')
    .description('Additional metadata associated with the record'),
  tags: Joi.array()
    .items(Joi.string()),
  createdBy: Joi.string()
    .label('Created By')
    .description('Identifier of the user who created this record'),
  createdByEmail: Joi.string()
    .email({ tlds: { allow: false }})
    .label('Created By Email')
    .description('Email of the user who created this record'),
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
