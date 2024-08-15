const Email = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    },
    status: {
      type: 'string'
    },
  }
}

// Export the model
module.exports = { Email }
