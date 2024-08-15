const mappings = {
  dynamic: false,
  properties: {
    name: {
      type: 'keyword',
    },
    code2: {
      type: 'keyword',
    },
    code3: {
      type: 'keyword',
      index: false,
    },
    code: {
      type: 'keyword',
      index: false,
    }
  }
}

module.exports = mappings
