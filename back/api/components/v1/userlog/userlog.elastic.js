const mappings = {
  dynamic: false,
  properties: {
    _userId: { type: 'keyword' },
    email: { type: 'keyword' },
    organization: { type: 'keyword' },
    userAgent: { type: 'keyword' },
    ip: { type: 'keyword' },
    eventType: { type: 'keyword' },
    eventDetail: { type: 'keyword' },
    createdAt: { type: 'date', format: 'strict_date_optional_time||epoch_second' }
  }
}

module.exports = mappings
