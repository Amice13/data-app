const mappings = {
  dynamic: false,
  type: 'object',
  properties: {
   name: {
      type: 'keyword',
    },
    code: {
      type: 'keyword'
    },
    vulnerabilitySpecified: {
      type: 'keyword'
    }
  }
}

module.exports = mappings
