const { elastic } = require('@api-config')
const { client } = require('@api-databases/elastic')

const getSummary = async (q) => {

  const index = `${elastic.dbPrefix}_assistances`

  const body = {
    size: 0,
    aggs: {
      distribution: {
        terms: { field: 'publicId' },
        aggs: {
          item: { top_hits: { size : 1 } },
          all: { sum: { field: 'familyStats.all' } },
          girls: { sum: { field: 'familyStats.girls' } },
          boys: { sum: { field: 'familyStats.boys' } },
          women: { sum: { field: 'familyStats.women' } },
          men: { sum: { field: 'familyStats.men' } },
          seniorWoman: { sum: { field: 'familyStats.seniorWoman' } },
          seniorMan: { sum: { field: 'familyStats.seniorMan' } },
          disabled: { sum: { field: 'familyStats.disabled' } },
          vulnerable: { sum: { field: 'familyStats.vulnerable' } },
          households: { value_count: { field: 'publicId' } },
          items: {
            nested: { path: 'items' },
            aggs: {
              item: {
                terms: { field: 'items.key' },
                aggs: {
                  amount: {
                    sum: {
                      field: 'items.value'
                    }
                  }                  
                }
              }
            }
          }
        }
      }
    }
  }
  const result = await client.search({ index, body })

  const stats = result.aggregations?.distribution?.buckets
  if (!stats) return []

  const summaries = stats.map(summary => {
    const request = summary.item?.hits?.hits?.[0]?._source
    let items = summary.items?.item?.buckets
    if (!request || !items) return false

    // Process items
    items = items.map(el => {
      el.value = el.amount.value
      delete el.amount
      return el
    })

    const res = {
      familyStats: {
        all: summary.all.value,
        girls: summary.girls.value,
        boys: summary.boys.value,
        women: summary.women.value,
        men: summary.men.value,
        seniorWoman: summary.seniorWoman.value,
        seniorMan: summary.seniorMan.value,
        disabled: summary.disabled.value,
        vulnerable: summary.vulnerable.value,
        households: summary.households.value    
      },
      publicId: request.publicId,
      date: request.date,
      address: {
        pCode1: request.address.pCode1,
        pCode2: request.address.pCode2,
        pCode3: request.address.pCode3,
        pCode4: request.address.pCode4,
      },
      collectiveCenter: request.collectiveCenter,
      items
    }
    return res
  }).filter(Boolean)

  return summaries
}
 
module.exports = getSummary
