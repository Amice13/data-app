const { elastic } = require('@api-config')
const { Client } = require('@elastic/elasticsearch')
const client = new Client(elastic)

const listIndices = async () => {
  const indices = await client.cat.indices({format: 'json'}).catch(err => {
    console.log(err)
  })
  console.log(indices)
}

const getMapping = async () => {
  const indices = await client.indices.getMapping({ index: 'unhcr_deduplication_users'}).catch(err => {
    console.log(err)
  })
  // console.log(indices['unhcr_deduplication_organizations']['mappings']['properties'])
  console.log(indices['unhcr_deduplication_users']['mappings']['properties']['translation']['properties']['uk']['properties'])
}

// getMapping()
// listIndices()

module.exports = client
