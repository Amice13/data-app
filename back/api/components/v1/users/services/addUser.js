const elastic = require('@api-databases/elastic')
const checkEmbeddedFields = require('./checkEmbeddedFields')

const addUser = async (body) => {
  body = await checkEmbeddedFields(body)
  const result = await elastic.create({ index: 'users', body })
  body.id = result._id
  return body
}
 
module.exports = addUser
