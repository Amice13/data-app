// Elasticsearch client
const client = require('./client')
const { elastic } = require('@api-config')

/**
* This function updates the document in the Elasticsearch collection.
* It uses the following params:
* @param {body} - Contains the update body
* @param {id} - The unique identifier of the entity
* @param {index} - The name of the document in the collection
*/

const updateById = async ({ id, index, body }) => {
  const result = await client.update({ index: `${elastic.dbPrefix}_${index}`, id, doc: body })
  return result
}

module.exports = updateById
