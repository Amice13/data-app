const person = require('../people/people.elastic.js')
const file = require('../files/files.elastic.js')
const organization = require('../organizations/organizations.elastic.js')
const organizationTranslation = organization.properties.translation.properties.uk
const personTranslation = person.properties.translation.properties.uk

const translation = {
  dynamic: false,
  properties: {
    uk: {
      type: 'object',
      properties: {
        person: personTranslation,
        responsibleOrganization: organizationTranslation,
        organization: organizationTranslation,
        jobTitle: {
          type: 'keyword'
        }
      }
    }
  }
}

const mappings = {
  dynamic: false,
  properties: {
    isSuperUser: {
      type: 'boolean',
    },
    email: {
      type: 'keyword',
    },
    verified: {
      type: 'boolean',
    },
    mfa: {
      type: 'keyword',
    },
    secret: {
      type: 'keyword',
      index: false,
    },
    privacyConsent: {
      type: 'boolean',
    },
    role: {
      type: 'keyword',
    },
    scopes: {
      type: 'keyword',
    },
    permissions: {
      type: 'keyword',
    },
    status: {
      type: 'keyword',
    },
    person,
    organization: {
      type: 'object',
      ...organization
    },
    jobTitle: {
      type: 'keyword',
    },
    responsibleOrganization: organization,
    image: file,
    restrictions: {
      type: 'keyword',
    },
    tags: {
      type: 'keyword',
    },
    createdAt: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_second',
    },
    updatedAt: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_second',
    },
    createdBy: {
      type: 'keyword',
    },
    updatedBy: {
      type: 'keyword',
    },
    translation
  }
}

module.exports = mappings
