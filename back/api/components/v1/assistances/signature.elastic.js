const mappings = {
  dynamic: false,
  enabled: false,
  type: 'object',
  properties: {
    penColor: {
      type: 'keyword'
    },
    dotSize: {
      type: 'double'
    },
    minWidth: {
      type: 'double'
    },
    maxWidth: {
      type: 'double'
    },
    velocityFilterWeight: {
      type: 'double'
    },
    compositeOperation: {
      type: 'keyword'
    },
    points: {
      type: 'object',
      properties: {
        time: {
          type: 'long'
        },
        x: {
          type: 'double'
        },
        y: {
          type: 'double'
        },
        pressure: {
          type: 'double'
        }
      }
    }
  }
}

module.exports = mappings
