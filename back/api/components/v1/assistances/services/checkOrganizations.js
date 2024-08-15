const elastic = require('@api-databases/elastic')

const checkOrganization = async (id) => {
  try {
    const organization = await elastic.getById({ index: 'organizations', id })
    return organization._id
  } catch (err) {
    return false
  }
}
 
module.exports = checkOrganization
