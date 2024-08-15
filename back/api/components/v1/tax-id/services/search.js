const { client } = require('@api-databases/elastic')
const { elastic } = require('@api-config')

const search = async ({ bundleName, taxId }) => {
  const index = `${elastic.dbPrefix}_assistances`
  const template = {
    index,
    _source: {
      includes: [
        'organization.name',
        'organization.translation',
        'bundleName',
        'headOfHousehold',
        'items',
        'address.pCode1',
        'address.pCode2',
        'address.pCode4',
        'date'
      ]
    },
    query: {
      bool: {
        should: {
          match_all: {}
        },
        filter: {
          bool: {
            should: [
              { term: { 'headOfHousehold.taxId': taxId }},
              { term: { 'familyMembers.taxId': taxId }}
            ]
          }
        }
      }
    }
  }
  let response = await client.search(template)
  if (!response.hits?.total?.value) return []
  const items = response.hits.hits.map(el => {
    const item = el._source
    item.id = el._id
    return item
  })
  return items
}

module.exports = search