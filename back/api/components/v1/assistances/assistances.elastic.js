const person = require('../people/people.elastic.js')
const familyMembers = require('./familyMembers.elastic.js')
const address = require('../addresses/addresses.elastic.js')
const collectiveCenter = require('./collectiveCenters.elastic.js')
const items = require('./items.elastic.js')
const objectives = require('./objectives.elastic.js')
const strings = require('./strings.elastic.js')
const familyStats = require('./familyStats.elastic.js')
const organization = require('../organizations/organizations.elastic.js')
const addressTranslation = address.properties.translation.properties.uk
const organizationTranslation = organization.properties.translation.properties.uk
const personTranslation = person.properties.translation.properties.uk
const collectiveCenterTranslation = collectiveCenter.properties.translation.properties.uk

const mappings = {
  properties: {
    date: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_second',
    },
    objectives,
    bundleName: {
      type: 'keyword',
    },
    householdId: {
      type: 'keyword'
    },
    familyMembersIds: {
      type: 'keyword'
    },
    publicId: {
      type: 'keyword',
    },
    aor: {
      type: 'keyword',
    },
    distributionType: {
      type: 'keyword',
    },
    distributionModality: {
      type: 'keyword',
    },
    populationType: {
      type: 'keyword',
    },
    headOfHousehold: person,
    familyMembers,
    address: {
      type: 'object',
      ...address
    },
    household: {
      type: 'object',
      ...address
    },
    collectiveCenter,
    items: {
      type: 'nested',
      properties: items.properties
    },
    strings: {
      type: 'nested',
      properties: strings.properties
    },
    familyStats,
    fundedBy: organization,
    responsibleOrganization: organization,
    organization,
    totalPrice: {
      type: 'integer',
    },
    comment: {
      type: 'text',
    },
    duplicated: {
      type: 'boolean',
    },
    groupId: {
      type: 'keyword',
    },
    signature: {
      enabled: false,
    },
    createdBy: {
      type: 'keyword',
    },
    createdByEmail: {
      type: 'keyword',
    },
    value: {
      type: 'integer',
    },
    currency: {
      type: 'keyword',
    },
    frequency: {
      type: 'integer',
    },
    attendedFrom: {
      type: 'date',
    },
    attendedTo: {
      type: 'date',
    },
    tags: {
      type: 'keyword',
    },
    metadata: {
      type: 'object',
      enabled: false
    },
    updatedBy: {
      type: 'keyword',
    },
    updatedByEmail: {
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
    translation: {
      properties: {
        uk: {
          type: 'object',
          properties: {
            headOfHousehold: personTranslation,
            address: addressTranslation,
            household: addressTranslation,
            fundedBy: organizationTranslation,
            responsibleOrganization: organizationTranslation,
            organization: organizationTranslation,
            collectiveCenter: collectiveCenterTranslation
          }
        }
      }
    }
  }
}

module.exports = mappings
