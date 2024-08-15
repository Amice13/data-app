const { client } = require('@api-databases/elastic')
const { elastic } = require('@api-config')

const search = async ({ bundleName, taxId }) => {
  const index = `${elastic.dbPrefix}_assistances`
  const items = []
  const template = {
    index: '',
    query: {
      bool: {
        should: {
          match_all: {}
        },
        filter: {
          bool: {
            should: [
              { terms: { taxId }},
              { terms: { 'familyMember.taxId': taxId }}
            ]
          }
        }
      }
    }
  }
  let response = await client.search(template)
  return response
}

module.exports = search