// Elasticsearch client
const client = require('./client')
const { elastic } = require('@api-config')

/**
* This function creates simple entities in the Elasticsearch collection.
* Creation of these entities does not include additional actions. It uses the following params:
* @param {body} - Contains the document to save
* @param {id} - The unique identifier of the entity
* @param {index} - The name of the collection in the database
*/

const create = async ({ index, body }) => {
  const result = await client.index({ index: `${elastic.dbPrefix}_${index}`, document: body })
  return result
}

module.exports = create
