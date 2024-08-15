const mappings = {
  dynamic: false,
  properties: {
    name: {
      type: 'keyword',
    },
    code: {
      type: 'keyword',
    },
    translation: {
      dynamic: false,
      properties: {
        uk: {
          dynamic: false,
          properties: {
            name: {
              type: 'keyword'
            }
          }
        }
      }
    }
  }
}

module.exports = mappings
