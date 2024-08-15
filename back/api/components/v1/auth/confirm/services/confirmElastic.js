const { CustomException } = require('@api-helpers/customException')
const elastic = require('@api-databases/elastic')

const intialize = async (code) => {
  // The database of users must be empty (users can make a mistake,
  // so we check only users with a confirmed email)
  // If the collection contains verified users, then reject
  let response = await elastic.get({ index: 'tokens', filters: { token: code, type: 'Email confirmation' } })

  // Check if the token exists
  const numberOfTokens = response?.hits?.total?.value || 0
  if (numberOfTokens !== 1) throw CustomException(403, 'Your confirmation token does not exist or expired')

  // Change the user status to confirmed
  const _userId = response.hits.hits?.[0]._source?._userId

  // Change user status to verified 
  await elastic.updateById({ index: 'users', id: _userId, body: { verified: true } })

  const tokenId = response.hits.hits[0]._id

  // Remove unnecessary token
  await elastic.remove({ index: 'tokens', id: tokenId })
  return true
}
 
module.exports = intialize
