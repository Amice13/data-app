const elastic = require('@api-databases/elastic')
const { CustomException } = require('@api-helpers/customException')
const logActivity = require('./logActivityElastic')

const verifyToken = async ({ _userId, user, code, ip, userAgent }) => {
  // Check if the token was issued
  const tokenResponse = await elastic.get({
    index: 'tokens',
    filters: { _userId, token: code, type: 'Email confirmation' },
    size: 1
  })

  // Log if the token is wrong
  if (!tokenResponse.hits?.total?.value) {
    await logActivity({
      _userId, userAgent, ip,
      email: user.email,
      organization: user.organization,
      eventType: 'Failed sign in',
      eventDetail: 'Wrong email token'
    })
    throw CustomException(403, 'This user does not exist or the password is wrong')
  }

  // Remove all email confirmation tokens
  await elastic.remove({ index: 'tokens', filters: { _userId, type: 'Email confirmation' } })
  return true
}

module.exports = verifyToken
