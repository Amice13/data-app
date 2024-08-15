const bcrypt = require('bcrypt')
const elastic = require('@api-databases/elastic')
const { CustomException } = require('@api-helpers/customException')

const {
  logActivity,
  grantAccess
} = require('@api-common')

const setPassword = async ({ _userId, reset, password, ip, userAgent }) => {
  // Get user data
  const userResponse = await elastic.getById({ index: 'users', id: _userId })
  const user = userResponse._source

  if (reset) {
    const resetTokenResponse = await elastic.get({ index: 'tokens', filters: { _userId, type: 'Reset password' }})
    if (!resetTokenResponse.hits?.total?.value) {
      await logActivity({
        email, userAgent, ip,
        eventType: 'Password',
        eventDetail: 'No reset token is provided'
      })
      throw CustomException(403, 'This user does not exist or the password is wrong')
    }
  }

  if (user.status === 'Blocked') throw (403, 'User is blocked')

  // Save the new password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  await elastic.create({ index: 'passwords', body: {
    _userId,
    password: hashedPassword,
    createdAt: (() => { return new Date() })()
  }})

  await logActivity({
    organization: user.organization?.id,
    email: user.email,
     _userId, ip, userAgent,
    eventType: 'Password',
    eventDetail: 'Password is changed'
  })

  return grantAccess({ _userId, user, ip, userAgent })
}

module.exports = setPassword
