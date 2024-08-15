const elastic = require('@api-databases/elastic')
const checkEmbeddedFields = require('./checkEmbeddedFields')

const addRequest = async (body) => {
  body = await checkEmbeddedFields(body)
  const result = await elastic.create({ index: 'requests', body })
  body.id = result._id
  return body
}
 
module.exports = addRequest
