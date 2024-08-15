const client = require('./client')
const { elastic } = require('@api-config')

const processFilters = filters => {
  if (!filters) return []
  if (typeof filters === 'string') filters = JSON.parse(filters)
  let filter = []
  for (let [key, value] of Object.entries(filters)) {
    filter.push( { terms: { [key]: Array.isArray(value) ? value : [value] }})
  }
  return filter
}

const processSort = sort => {
  if (sort.key === 'relevance') sort.key = '_score'
  sort = [{ [sort.key]: { order: sort.mode } }]
  if (sort.key === 'createdAt') sort[0][sort.key].format = 'strict_date_optional_time_nanos'
  return sort
}

const makeRegexpQuery = ([key, value]) => {
  value = value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
  return {
    regexp: {
      [key]: {
        value: `.*${value}.*`,
        flags: 'ALL',
        case_insensitive: true,
        max_determinized_states: 10000,
        rewrite: 'constant_score_blended'
      }
    }
  }  
}
const getQuery = (query, queryFields) => {
  if (!query || typeof query !== 'object') return { match_all: {} }
  if (!Object.entries(query).length) return { match_all: {} }
  const [fieldName, value] = Object.entries(query)[0]
  if (!value) return { match_all: {} }
  if (fieldName.match(/_all$/)) {
    return queryFields.map(el => makeRegexpQuery([el, value]))
  }
  return makeRegexpQuery([fieldName, value])
}

/**
* This function gets simple entities from the database. It uses the following params:
* @param {body} - The set of search parameters
*/

const search = async ({
  index,
  query,
  offset,
  limit,
  filters,
  sort,
  sortOrder,
  userId,
  queryFields,
  fields,
  start,
  end
}) => {
  query = getQuery(query, queryFields)
  if (sort) {
    sort = { [sort]: [sortOrder ? sortOrder : 'asc'] }
  }
  const from = offset || 0
  const size = limit || 25
  filters = processFilters(filters)
  const template = { query: { bool: { should: query, filter: []  } }, from, size }
  template.query.bool.filter.push(...filters)
  if (start) template.query.bool.filter.push({ range: { dateCreated: { gte: start }}})
  if (end) template.query.bool.filter.push({ range: { dateCreated: { lte: end }}})
  if (template.query.bool.filter.length === 0) delete template.query.bool.filter
  if (fields) template._source = { includes: fields }
  template.index = `${elastic.dbPrefix}_${index}`
  let response = await client.search(template)
  return response
}

module.exports = search
