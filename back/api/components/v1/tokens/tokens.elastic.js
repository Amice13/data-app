const mappings = {
  properties: {
    _userId: { type: 'keyword' },
    token: { type: 'keyword' },
    type: { type: 'keyword' },
    createdAt: { type: 'date', format: 'strict_date_optional_time||epoch_second' },
    updatedAt: { type: 'date', format: 'strict_date_optional_time||epoch_second' },
    expireAt: { type: 'date', format: 'strict_date_optional_time||epoch_second' }
  }
}

module.exports = mappings

