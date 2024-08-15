const elastic = require('@api-databases/elastic')
const { CustomException } = require('@api-helpers/customException')
const logActivity = require('./logActivityElastic')

const getUser = async ({ email, userAgent, ip }) => {
  // Find the user
  const userResponse = await elastic.get({ index: 'users', filters: { email }})
  if (!userResponse.hits?.total?.value) {
    await logActivity({
      email, userAgent, ip,
      eventType: 'Failed sign in',
      eventDetail: 'Wrong username'
    })
    throw CustomException(403, 'This user does not exist or the password is wrong')
  }

  // Get user's data
  const _userId = userResponse.hits.hits[0]._id
  const user = userResponse.hits.hits[0]._source

  // Check if the user is blocked
  if (user.status === 'Blocked') {
    await logActivity({
      email, userAgent, ip, _userId,
      organization: user.organization?.id,
      eventType: 'Failed sign in',
      eventDetail: 'User is blocked'
    })
    throw CustomException(403, 'This user is blocked')
  }

  // Check if the user email is not verified
  if (!user.verified) {
    await logActivity({
      email, userAgent, ip, _userId,
      organization: user.organization?.id,
      eventType: 'Failed sign in',
      eventDetail: 'User hasn\'t verified the email'
    })
    throw CustomException(403, 'Your email is not confirmed yet')
  }
  return { _userId, user }
}

module.exports = getUser
