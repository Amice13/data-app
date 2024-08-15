const Joi = require('joi')
const person = require('@api-components/people/validators/people')
const organization = require('@api-components/organizations/validators/organizations')
const file = require('@api-components/files/validators/files')

const organizationTranslation = organization.translationDetails
const personTranslation = person.translationDetails

// Translation
const translationDetails = Joi.object({
  person: personTranslation,
  organization: organizationTranslation,
  responsibleOrganization: organizationTranslation,
  jobTitle: Joi.string().allow(null, '')
})

const translation = Joi.object()
  .pattern(/^([a-z]{2})$/, translationDetails)
  .description('The list of translations')

const body = Joi.object({
  id: Joi.string(),
  isSuperUser: Joi.boolean()
    .label('Super User')
    .description('Indicates if the user is a super user'),  
  email: Joi.string()
    .email({ tlds: { allow: false }})
    .label('Email')
    .description('The email address of the user for authentication'),
  verified: Joi.boolean()
    .label('Verified')
    .description('Indicates if the user\'s email has been verified'),
  mfa: Joi.string()
    .label('MFA')
    .description('Multi-factor authentication status'),
  secret: Joi.string()
    .label('MFA Secret')
    .description('Secret key for MFA authentication')
    .allow(null, ''),
  privacyConsent: Joi.boolean()
    .label('Privacy Consent')
    .description('Indicates if the user has given privacy consent'),
  role: Joi.array().
    items(Joi.string()
      .label('Role')
      .description('Role assigned to the user')
    )
    .description('List of user roles'),
  scopes: Joi.array().
    items(Joi.string()
      .label('Scopes')
      .description('Scopes assigned to the user')
    )
    .description('List of scopes'),
  permissions: Joi.array()
    .items(Joi.string()
      .label('Permissions')
      .description('Permissions assigned to the user')
    )
    .description('List of permissions'),
  status: Joi.string()
    .valid('Active', 'Blocked')
    .label('Status')
    .description('Status of the user'),
  person: person.body,
  organization: organization.body,
  jobTitle: Joi.string()
    .label('Job title')
    .description('Person\'s position in the organization'),
  responsibleOrganization: Joi.array()
    .items(organization.body),
  image: Joi.array().items(file.body),
  restrictions: Joi.array()
    .items(Joi.string()
      .label('Restrictions')
      .description('Admin1-Admin4 p-code')
    )
    .description('List of p-codes to limit user access'),
  tags: Joi.array()
    .items(Joi.string()),
  createdAt: Joi.string()
    .isoDate()
    .label('Created by')
    .description('The date when the user was created'),
  updatedAt: Joi.string()
    .isoDate()
    .label('Updated by')
    .description('The most recent date when the user was updated'),
  createdBy: Joi.string()
    .label('Created at')
    .description('The identifier of the user who added the user'),
  updatedBy: Joi.string()
    .label('Updated at')
    .description('The identifier of the user who recently updated the user'),
  translation
})

module.exports = { body, translationDetails }
