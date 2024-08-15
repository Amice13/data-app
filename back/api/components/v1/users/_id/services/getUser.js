const elastic = require('@api-databases/elastic')
const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')

const getUser = async ({ id }) => {
  const user = await elastic.getById({ index: 'users', id })
  if (user._source) user._source.id = user._id
  return user._source
}
 
module.exports = getUser
