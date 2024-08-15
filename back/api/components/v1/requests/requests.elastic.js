const user = require('../users/users.elastic.js')
const familyMembers = require('../assistances/familyMembers.elastic.js')
const address = require('../addresses/addresses.elastic.js')
const collectiveCenter = require('../assistances/collectiveCenters.elastic.js')
const items = require('../assistances/items.elastic.js')
const familyStats = require('../assistances/familyStats.elastic.js')
const organization = require('../organizations/organizations.elastic.js')
const addressTranslation = address.properties.translation.properties.uk
const organizationTranslation = organization.properties.translation.properties.uk
const usersTranslation = user.properties.translation.properties.uk
const collectiveCenterTranslation = collectiveCenter.properties.translation.properties.uk

const mappings = {
  properties: {
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
    address: {
      type: 'object',
      ...address
    },
    collectiveCenter,
    items: {
      type: 'nested',
      properties: items.properties
    },
    fundedBy: organization,
    responsibleOrganization: organization,
    organization,
    assignees: user,
    status: {
      type: 'keyword'
    },
    comment: {
      type: 'text',
    },
    metadata: {
      type: 'object',
      enabled: false
    },
    tags: {
      type: 'keyword',
    },
    createdBy: {
      type: 'keyword',
    },
    createdByEmail: {
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
    translation: {
      properties: {
        uk: {
          type: 'object',
          properties: {
            assignees: usersTranslation,
            address: addressTranslation,
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
