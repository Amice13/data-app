// Elasticsearch client
const client = require('./client')
const { elastic } = require('@api-config')

/**
* This function creates simple entities in the Elasticsearch collection.
* Creation of these entities does not include additional actions. It uses the following params:
* @param {id} - The unique identifier of the document
* @param {index} - Name of the index that contains the document
*/

const getById = async ({ id, index }) => {
  const result = await client.get({ id, index: `${elastic.dbPrefix}_${index}` })
  return result
}

module.exports = getById
