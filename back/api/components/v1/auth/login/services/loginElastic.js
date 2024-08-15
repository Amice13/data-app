const getUser = require('./getUserElastic')
const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')
const checkPassword = require('./checkPasswordElastic')
const checkPasswordAgeAndAuthor = require('./checkPasswordAgeAndAuthorElastic')
const checkBruteforce = require('./checkBruteforceElastic')
const logActivity = require('./logActivityElastic')
const sendVerificationEmail = require('./sendVerificationEmailElastic')
const sendTotp = require('./sendTotpElastic')
const resetPassword = require('./resetPasswordElastic')

const login = async ({ email, password, userAgent, ip, language }) => {

  const { _userId, user } = await getUser({ email, userAgent, ip })

  // Check if the account is brutefored and reject
  await checkBruteforce({ _userId, user, ip, eventDetail: 'Invalid password' })

  // Check password
  const isPasswordMatch = await checkPassword({ _userId, user, password, userAgent, ip })

  if (!isPasswordMatch) {
    await logActivity({
      organization: user.organization?.id,
      email: user.email,
       _userId, ip, userAgent,
      eventType: 'Failed sign in',
      eventDetail: 'Invalid password'
    })
    throw CustomException(403, 'This user does not exist or the password is wrong')
  }

  /* 2FA - Check if the strict security measures are introduced */

  // Check if email authorization is used
  if (appConfig.emailVerification) {
    let sendEmailMessage = await sendVerificationEmail({ _userId, email, userAgent, ip, language })
    return sendEmailMessage
  }

  // Check if one-time password authorization is used
  if (appConfig.totpVerification) {
    let sendTotpMessage = await sendTotp({ _userId, user, userAgent, ip })
    return sendTotpMessage
  }

  // Check the password age
  const passwordMustBeChanged = await checkPasswordAgeAndAuthor({ _userId, user })
  if (passwordMustBeChanged) return resetPassword(_userId)

  return await grantAccess({ user, ip })
  return true
}
 
module.exports = login
