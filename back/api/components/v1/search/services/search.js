const elastic = require('@api-databases/elastic')

const search = async ({ entity, search, field, fields, user }) => {
  let queryFields = [field]
  if (field.match(/^translation\./)) queryFields = [field, field.replace(/^translation\.[^.]*\./, '')] 
  const records = await elastic.search({
    index: entity,
    sort: field,
    sortOrder: 'asc',
    query: { _all: search },
    field: 'tags',
    limit: 10,
    queryFields,
    fields
  })
  const items = records.hits.hits.map(el => {
    const data = el._source
    data.id = el._id
    return data
  })
  return items
}

module.exports = search
