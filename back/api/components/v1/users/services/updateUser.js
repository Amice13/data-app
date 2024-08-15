const elastic = require('@api-databases/elastic')
const checkEmbeddedFields = require('./checkEmbeddedFields')

const updateOrganization = async (body) => {

  body = await checkEmbeddedFields(body)
  const { id } = body
  delete body.id

  const result = await elastic.updateById({ index: 'users', body, id })
  body.id = result._id
  return body
}
 
module.exports = updateOrganization
