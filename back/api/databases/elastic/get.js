const client = require('./client')
const { elastic } = require('@api-config')

const processFilters = filters => {
  if (!filters) return []
  if (typeof filters === 'string') filters = JSON.parse(filters)
  let filter = []
  for (let [key, value] of Object.entries(filters)) {
    filter.push( { terms: { [key]: [value] }})
  }
  return filter
}

const processSort = sort => {
  if (sort.key === 'relevance') sort.key = '_score'
  sort = [{ [sort.key]: { order: sort.mode } }]
  if (sort.key === 'createdAt') sort[0][sort.key].format = 'strict_date_optional_time_nanos'
  return sort
}

const processQuery = query => {
  if (!query) return { match_all: {} }
  query = query.replace(/(?<![А-ЯЄЯІЇ])И(?![А-ЯЄЯІЇ])/g, 'AND').replace(/(?<![А-ЯЄЯІЇ])ИЛИ(?![А-ЯЄЯІЇ])/g, 'OR')
  query = { query_string: { query, fields: ['body'] } }
  return query
}

const processHighlight = highlight => {
  return {
    number_of_fragments: 3,
    fragment_size: 150,
    fields : {
      'articleBody': { 'pre_tags': ['<em class="text-highlight">'], 'post_tags' : ['</em>'] },
      'articleBody.rus': { 'pre_tags': ['<em class="text-highlight">'], 'post_tags' : ['</em>'] },
    }
  }
}

/**
* This function gets simple entities from the database. It uses the following params:
* @param {body} - The set of search parameters
*/

const search = async ({ index, query, highlight, size, from, filters, sort, userId, start, end }) => {
  from = from || 0
  size = size || 25
  // highlight = processHighlight(highlight)
  filters = processFilters(filters)
  query = processQuery(query)
  const template = { query: { bool: { must: query, filter: []  } }, from, size, highlight }
  if (sort) {
    // sort = !sort ? [{ createdAt: { order: 'desc', format: 'strict_date_optional_time_nanos' } }] : processSort(sort)
    sort = processSort(sort)
    template.sort = sort
  }
  template.query.bool.filter.push(...filters)
  if (start) template.query.bool.filter.push({ range: { dateCreated: { gte: start }}})
  if (end) template.query.bool.filter.push({ range: { dateCreated: { lte: end }}})
  if (template.query.bool.filter.length === 0) delete template.query.bool.filter
  template.index = `${elastic.dbPrefix}_${index}`
  let response = await client.search(template)
  return response
}

module.exports = search
