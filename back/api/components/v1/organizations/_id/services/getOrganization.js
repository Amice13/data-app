const elastic = require('@api-databases/elastic')
const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')

const getOrganization = async ({ id }) => {
  const organization = await elastic.getById({ index: 'organizations', id })
  organization._source.id = id
  return organization._source
}
 
module.exports = getOrganization
