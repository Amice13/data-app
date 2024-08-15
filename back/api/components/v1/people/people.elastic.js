const vulnerability = require('./vulnerabilities.elastic.js')

const mappings = {
  dynamic: false,
  properties: {
    id: {
      type: 'keyword',
    },
    taxId: {
      type: 'keyword',
    },
    noTaxId: {
      type: 'boolean',
    },
    noDocuments: {
      type: 'boolean',
    },
    passport: {
      type: 'keyword',
    },
    populationType: {
      type: 'keyword',
    },
    fullName: {
      type: 'keyword',
      fields: {
        text: { type: 'text' }
      },
    },
    familyName: {
      type: 'keyword',
    },
    givenName: {
      type: 'keyword',
    },
    additionalName: {
      type: 'keyword',
    },
    gender: {
      type: 'keyword',
    },
    birthday: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_millis'
    },
    age: {
      type: 'integer'
    },
    origin: {
      type: 'keyword'
    },
    vulnerability,
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
    createdAt: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_millis'
    },
    updatedAt: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_millis'
    },
    createdBy: {
      type: 'keyword',
    },
    updatedBy: {
      type: 'keyword',
    },
    translation: {
      type: 'object',
      dynamic: false,
      properties: {
        uk: {
          type: 'object',
          dynamic: false,
          properties: {
            fullName: {
              type: 'keyword',
              fields: {
                text: { type: 'text' }
              },
            },
            familyName: {
              type: 'keyword',
            },
            givenName: {
              type: 'keyword',
            },
            additionalName: {
              type: 'keyword',
            }
          }
        }
      }
    }
  }
}

module.exports = mappings
