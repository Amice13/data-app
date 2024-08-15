const elastic = require('@api-databases/elastic')

const checkOrganization = async (id) => {
  try {
    const user = await elastic.getById({ index: 'users', id })
    return user._id
  } catch (err) {
    return false
  }
}
 
module.exports = checkOrganization
