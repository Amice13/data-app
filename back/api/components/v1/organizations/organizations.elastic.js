const address = require('../addresses/addresses.elastic.js')
const file = require('../files/files.elastic.js')

const addressTranslation = address.properties.translation.properties.uk

const translation = {
  type: 'object',
  dynamic: false,
  properties: {
    uk: {
      type: 'object',
      dynamic: false,
      properties: {
        name: {
          type: 'keyword',
        },
        legalName: {
          type: 'keyword',
          fields: {
            raw: {
              type: 'text',
              analyzer: 'ukrainian'
            }
          },
        },
        description: {
          type: 'text',
        },
        address: addressTranslation
      }
    }
  }
}

const mappings = {
  dynamic: false,
  properties: {
    id: {
      type: 'keyword',
    },
    code: {
      type: 'keyword',
    },
    name: {
      type: 'keyword',
    },
    status: {
      type: 'keyword',
    },
    description: {
      type: 'text',
    },
    legalName: {
      type: 'keyword',
      fields: {
        raw: { type: 'text' }
      },
    },
    type: {
      type: 'keyword',
    },
    functionalType: {
      type: 'keyword',
    },
    address,
    logo: file,
    email: {
      type: 'keyword',
    },
    phone: {
      type: 'keyword',
    },
    website: {
      type: 'keyword',
    },
    tags: {
      type: 'keyword',
    },
    createdBy: {
      type: 'keyword',
    },
    updatedBy: {
      type: 'keyword',
    },
    createdAt: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_millis',
    },
    updatedAt: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_millis',
    },
    translation
  }
}

module.exports = mappings
