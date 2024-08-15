const vulnerability = require('../people/vulnerabilities.elastic.js')

const mappings = {
  dynamic: false,
  type: 'object',
  properties: {
    taxId: {
      type: 'keyword',
    },
    noTaxId: {
      type: 'boolean',
    },
    passport: {
      type: 'keyword',
    },
    age: {
      type: 'integer',
    },
    gender: {
      type: 'keyword',
    },
    vulnerability
  }
}

module.exports = mappings
