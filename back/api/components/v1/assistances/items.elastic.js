const mappings = {
  dynamic: false,
  properties: {
    key: {
      type: 'keyword',
    },
    value: {
      type: 'double',
    },
    price: {
      type: 'integer',
    },
    boolean: {
      type: 'boolean',
    },
    text: {
      type: 'text',
    }
  }
}

module.exports = mappings
