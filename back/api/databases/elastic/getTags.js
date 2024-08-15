const client = require('./client')
const { elastic } = require('@api-config')

/**
* This function gets simple entities from the database. It uses the following params:
* @param {body} - The set of search parameters
*/

const getTags = async ({ index, search, field }) => {
  const $regex = search.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
  index = `${elastic.dbPrefix}_${index}`

  const template = {
    index,
    query: {
      bool: {
        must: { match_all: {} },
        filter: {
          bool: {
            must: [{
              regexp: {
                [field]: {
                  value: '.*' + $regex + '.*',
                  flags: 'ALL',
                  case_insensitive: true,
                  max_determinized_states: 10000
                }
              }
            }]
          }
        }
      }
    },
    aggs: { [field]: { terms: { field, size: 10 } } },
    size: 0
  }

  let result = await client.search(template)
  let data = result.aggregations?.[field]?.buckets
  if (!data) return []
  data = data.map(el => el.key).filter(el => el.match($regex))
  return data
}

module.exports = getTags
