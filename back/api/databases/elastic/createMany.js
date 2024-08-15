// Elasticsearch client
const client = require('./client')

/**
* This function creates simple entities in the Elasticsearch collection.
* Creation of these entities does not include additional actions. It uses the following params:
* @param {body} - Array of the documents to insert
* @param {id} - The unique identifier of the entity
* @param {index} - The name of the collection in the database
*/

const createMany = async ({ id, index, body }) => {
  const actions = []
  for (let doc of body) {
    actions.push({ index: { _index: index, _id: id }})
    actions.push(doc.body)
  }
  const result = client.bulk({ body: actions })
  return result
}

module.exports = createMany
