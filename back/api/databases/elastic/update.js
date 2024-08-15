// Elasticsearch client
const client = require('./client')

/**
* This function creates simple entities in the Elasticsearch collection.
* Creation of these entities does not include additional actions. It uses the following params:
* @param {body} - Contains the document to save
* @param {id} - The unique identifier of the entity
* @param {index} - The name of the collection in the database
*/

const update = async ({ id, index, body }) => {
  const result = await client.index({ index, id, document: body })
  return result
}

module.exports = update
