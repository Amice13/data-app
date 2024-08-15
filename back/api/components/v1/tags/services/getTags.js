const elastic = require('@api-databases/elastic')

const getTags = async ({ entity, search }) => {
  const result = await elastic.getTags({ index: entity, search, field: 'tags' })
  return result
}

module.exports = getTags
