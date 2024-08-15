const elastic = require('@api-databases/elastic')
const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')

const getAssistance = async ({ id }) => {
  const request = await elastic.getById({ index: 'assistances', id })
  if (request._source) request._source.id = request._id
  return request._source
}
 
module.exports = getAssistance
