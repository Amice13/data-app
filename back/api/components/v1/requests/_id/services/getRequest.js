const elastic = require('@api-databases/elastic')
const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')

const getRequest = async ({ id }) => {
  const request = await elastic.getById({ index: 'requests', id })
  if (request._source) request._source.id = request._id
  return request._source
}
 
module.exports = getRequest
