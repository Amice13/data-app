const country = require('./countries.elastic.js')

const mappings = {
  dynamic: false,
  properties: {
    id: {
      type: 'keyword',
    },
    name: {
      type: 'keyword',
    },
    householdId: {
      type: 'keyword'
    },
    osmId: {
      type: 'keyword',
    },
    stateId: {
      type: 'keyword',
    },
    sidarId: {
      type: 'keyword',
    },
    type: {
      type: 'keyword',
    },
    fullAddress: {
      type: 'keyword',
    },
    country,
    admin1: {
      type: 'keyword',
    },
    admin2: {
      type: 'keyword',
    },
    admin3: {
      type: 'keyword',
    },
    admin4: {
      type: 'keyword',
    },
    pCode1: {
      type: 'keyword',
    },
    pCode2: {
      type: 'keyword',
    },
    pCode3: {
      type: 'keyword',
    },
    pCode4: {
      type: 'keyword',
    },
    street: {
      type: 'keyword',
    },
    streetType: {
      type: 'keyword',
    },
    building: {
      type: 'keyword',
    },
    block: {
      type: 'keyword',
    },
    apartment: {
      type: 'keyword',
    },
    location: { type: 'geo_point' },
    createdAt: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_second',
    },
    tags: {
      type: 'keyword',
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
    translation: {
      type: 'object',
      dynamic: false,
      properties: {
        uk: {
          dynamic: false,
          type: 'object',
          properties: {
            fullAddress: {
              type: 'keyword',
            },
            street: {
              type: 'keyword',
            },
            building: {
              type: 'keyword',
            }
          }
        }
      }
    }
  }
}

module.exports = mappings
