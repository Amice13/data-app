const { CustomException } = require('@api-helpers/customException')
const { client } = require('@api-databases/elastic')

const getIndices = async (body) => {
  const indices = await client.cat.indices({ format: 'json' })
  return indices
}
 
module.exports = getIndices
