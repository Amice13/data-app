// Elasticsearch client
const client = require('./client')
const { elastic } = require('@api-config')

const deleteModel = async ({ index }) => {
  const indexExists = await client.indices.exists({ index: elastic.dbPrefix + '_' + index })
  if (!indexExists) return false
  try {
    await client.indices.delete({ index: elastic.dbPrefix + '_' + index })
    console.log(`Index ${elastic.dbPrefix}_${index} is deleted`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = deleteModel
