const mappings = {
  dynamic: false,
  properties: {
    id: {
      type: 'keyword',
    },
    name: {
      type: 'keyword',
    },
    path: {
      type: 'keyword',
      index: false,
    },
    description: {
      type: 'text',
      index: false,
    },
    size: {
      type: 'integer',
    },
    mimeType: {
      type: 'keyword',
    },
    orphaned: {
      type: 'boolean',
    },
    createdAt: {
      type: 'date',
      format: 'strict_date_optional_time||epoch_millis',
    },
    category: {
      type: 'keyword',
    }
  }
}

module.exports = mappings
