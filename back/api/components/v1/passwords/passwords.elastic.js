const mappings = {
  properties: {
    _userId: { type: 'keyword' }, // Assuming ObjectId will be stored as a string
    password: { type: 'text' },
    createdBy: { type: 'keyword' },
    createdAt: { type: 'date', format: 'strict_date_optional_time||epoch_second' }
  }
}

module.exports = mappings
