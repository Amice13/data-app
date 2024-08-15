const client = require('./client')
const { elastic } = require('@api-config')

/**
* This function counts the number of documents in the index. It uses the following params:
* @param {index} - The index with the documents
*/

const count = async ({ index }) => {
  let response = await client.count({ index: `${elastic.dbPrefix}_${index}` })
  return response
}

module.exports = count
