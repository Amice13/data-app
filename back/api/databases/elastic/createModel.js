// Elasticsearch client
const client = require('./client')
const { elastic } = require('@api-config')

// Default Elastic settings
const defaultSettings = {
  'index.mapping.total_fields.limit': 5000,
  'index.mapping.nested_fields.limit': 500,
  'index.mapping.ignore_malformed': true,
  index: {
    number_of_shards: elastic.numberOfShards,
    analysis: {
      analyzer: {
        suggest: {
          tokenizer: 'standard',
          filter: ['lowercase']
        }
      }
    }
  }
}

const createModel = async ({ index, settings, mappings }) => {
  const indexExists = await client.indices.exists({ index: elastic.dbPrefix + '_' + index })
  if (indexExists) return false
  try {
    if (settings) settings = { ...defaultSettings, ...settings }
    if (!settings) settings = defaultSettings
    await client.indices.create({ index: elastic.dbPrefix + '_' + index, settings, mappings })
    console.log(`Index ${elastic.dbPrefix}_${index} is created`)
  } catch (err) {
    console.log(index, err.meta.body.error)
  }
}

module.exports = createModel
