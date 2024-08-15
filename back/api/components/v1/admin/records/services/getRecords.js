const { CustomException } = require('@api-helpers/customException')
const { get } = require('@api-databases/elastic')

const getRecords = async (body) => {
  const records = await get(body)
  return records
}
 
module.exports = getRecords
