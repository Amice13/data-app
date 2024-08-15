const address = require('../addresses/addresses.elastic.js')
const familyStats = require('../assistances/familyStats.elastic.js')
const collectiveCenter = require('../assistances/collectiveCenters.elastic.js')
const organization = require('../organizations/organizations.elastic.js')
const addressTranslation = address.properties.translation.properties.uk
const organizationTranslation = organization.properties.translation.properties.uk
const collectiveCenterTranslation = collectiveCenter.properties.translation.properties.uk

const translation = {
  properties: {
    uk: {
      properties: {
        address: addressTranslation,
        responsibleOrganization: organizationTranslation,
        organization: organizationTranslation,
        collectiveCenter: collectiveCenterTranslation,
      }
    }
  }
}

const mappings = {
  properties: {
    date: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_second',
    },
    month: {
      type: 'keyword',
    },

    bundleName: {
      type: 'keyword',
    },

    // For quick aggregations
    aor: {
      type: 'keyword',
    },

    // POC type
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
    familyStats,
    address,
    collectiveCenter,
    responsibleOrganization: organization,
    organization,
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
          properties: {
            address: addressTranslation,
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
