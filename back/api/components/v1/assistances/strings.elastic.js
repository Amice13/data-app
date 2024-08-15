const mappings = {
  dynamic: false,
  properties: {
    key: {
      type: 'keyword',
    },
    value: {
      type: 'keyword',
      fields: {
        text: { type: 'text' }
      }
    },
  }
}

module.exports = mappings
