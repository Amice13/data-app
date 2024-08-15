const speakeasy = require('@levminer/speakeasy')
const elastic = require('@api-databases/elastic')
const { CustomException } = require('@api-helpers/customException')

const {
  logActivity,
  checkBruteforce,
  checkPasswordAgeAndAuthor,
  grantAccess,
  resetPassword
} = require('@api-common')

const verifyTotp = async ({ _userId, code, ip, userAgent }) => {
  // Get user data
  const userResponse = await elastic.getById({ index: 'users', id: _userId })
  const user = userResponse._source

  await checkBruteforce({ email: user.email, _userId, user, ip, userAgent, eventDetail: 'Invalid TOTP' })

  if (user.status === 'Blocked') throw (403, 'User is blocked')

  // Check if the token was issued
  if (!user.secret) throw (403, 'Secret for the one time password is not issued. Proceed to authorization.')

  // Verify the token provided by the user
  const { secret } = user
  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: code,
    window: 2
  })
  
  // If token is wrong, check the malicious activities
  if (!verified) {
    await logActivity({
      organization: user.organization?.id,
      email: user.email,
       _userId, ip, userAgent,
      eventType: 'Failed sign in',
      eventDetail: 'Invalid TOTP'
    })
    throw CustomException(403, 'One-time password is wrong')
  }

  // Save the confirmation of TOTP for the first time
  if (user.mfa !== 'TOTP is set') await elastic.updateById({
    id: _userId,
    index: 'users',
    body: { mfa: 'TOTP is set' }
  })

  // Check the password
  const passwordMustBeChanged = await checkPasswordAgeAndAuthor({ _userId, user })
  if (passwordMustBeChanged) return resetPassword(_userId)
  return grantAccess({ _userId, user, ip, userAgent })
}

module.exports = verifyTotp
