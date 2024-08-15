const bcrypt = require('bcrypt')
const { CustomException } = require('@api-helpers/customException')
const elastic = require('@api-databases/elastic')
const logActivity = require('./logActivityElastic')

const checkPassword = async ({ _userId, user, password, userAgent, ip }) => {
  // Find the recent user's password
  const passwordResponse = await elastic.get({
    index: 'passwords',
    filters: { _userId },
    sort: { key: 'createdAt', mode: 'desc' }
  })
  if (!passwordResponse.hits?.total?.value) {
    await logActivity({
      email, userAgent, ip, _userId,
      organization: user.organization?.id,
      eventType: 'Failed sign in',
      eventDetail: 'Invalid password'
    })
    throw CustomException(403, 'This user does not exist or the password is wrong')
  }
  const realPassword = passwordResponse.hits.hits[0]._source.password

  // Check if passwords match
  const isPasswordMatch = await bcrypt.compare(password, realPassword)

  return isPasswordMatch
}

module.exports = checkPassword
