const client = require('./client')
const { elastic } = require('@api-config')

const processFilters = filters => {
  if (!filters) return []
  try { filters = JSON.parse(filters) } catch { return [] }
  let filter = []
  for (let { key, value } of filters) {
    filter.push( { terms: { [key]: [value] }})
  }
  return filter
}

const processQuery = query => {
  if (!query) return { match_all: {} }
  query = query.replace(/(?<![А-ЯЄЯІЇ])И(?![А-ЯЄЯІЇ])/g, 'AND').replace(/(?<![А-ЯЄЯІЇ])ИЛИ(?![А-ЯЄЯІЇ])/g, 'OR')
  query = { query_string: { query, fields: ['body'] } }
  return query
}

/**
* This function removes entities from the database. It uses the following params:
* @param {body} - The set of remove parameters
*/

const remove = async ({ index, query, filters }) => {
  filters = processFilters(filters)
  query = processQuery(query)
  const template = { query: { bool: { must: query, filter: []  } }}
  template.query.bool.filter.push(...filters)
  if (template.query.bool.filter.length === 0) delete template.query.bool.filter
  let response = await client.deleteByQuery({ index: `${elastic.dbPrefix}_${index}`, body: template })
  return response
}

module.exports = remove
