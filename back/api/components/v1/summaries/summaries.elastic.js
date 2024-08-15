const person = require('../people/people.elastic.js')
const familyMembers = require('../assistances/familyMembers.elastic.js')
const address = require('../addresses/addresses.elastic.js')
const collectiveCenter = require('../assistances/collectiveCenters.elastic.js')
const files = require('../files/files.elastic.js')
const items = require('../assistances/items.elastic.js')
const familyStats = require('../assistances/familyStats.elastic.js')
const organization = require('../organizations/organizations.elastic.js')
const addressTranslation = address.properties.translation.properties.uk
const organizationTranslation = organization.properties.translation.properties.uk
const personTranslation = person.properties.translation.properties.uk
const collectiveCenterTranslation = collectiveCenter.properties.translation.properties.uk

const translation = {
  dynamic: false,
  properties: {
    uk: {
      type: 'object',
      dynamic: false,
      properties: {
        address: addressTranslation,
        fundedBy: organizationTranslation,
        responsibleOrganization: organizationTranslation,
        receivingOrganization: organizationTranslation,
        organization: organizationTranslation,
        collectiveCenter: collectiveCenterTranslation,
        focalPoint: personTranslation
      }
    }
  }
}

const mappings = {
  dynamic: false,
  properties: {
    isCalculated: {
      type: 'boolean',
    },
    isDonation: {
      type: 'boolean',
    },
    date: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_second',
    },
    bundleName: {
      type: 'keyword',
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
    buildings: {
      type: 'integer',
    },
    households: {
      type: 'integer',
    },
    individuals: {
      type: 'integer',
    },
    items: {
      type: 'nested',
      properties: items.properties
    },
    familyStats,
    address,
    collectiveCenter,
    fundedBy: organization,
    responsibleOrganization: organization,
    organization,
    receivingOrganization: organization,
    focalPoint: person,
    files,
    totalPrice: {
      type: 'integer',
    },
    comment: {
      type: 'text',
    },
    metadata: {
      type: 'object',
      enabled: false
    },
    createdBy: {
      type: 'keyword',
    },
    createdByEmail: {
      type: 'keyword',
    },
    tags: {
      type: 'keyword',
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
    translation
  }
}

module.exports = mappings
