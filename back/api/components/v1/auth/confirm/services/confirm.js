const { CustomException } = require('@api-helpers/customException')
const elastic = require('@api-databases/elastic')

const confirm = async (body) => {
  // The database of users must be empty (users can make a mistake,
  // so we check only users with a confirmed email)
  // If the collection contains verified users, then reject
  let response = await elastic.get({ index: 'users', filters: { verified: true }, size: 0 })
  const numberOfUsers = response?.hits?.total?.value || 0
  if (numberOfUsers.count > 0) {
    throw CustomException(403, 'Your confirmation token does not exist or expired.')
  }

  return { status: 'ok' }
}
 
module.exports = confirm
