const elastic = require('@api-databases/elastic')
const { CustomException } = require('@api-helpers/customException')
const logActivity = require('./logActivityElastic')
const verifyToken = require('./verifyTokenElastic')
const checkPasswordAgeAndAuthor = require('./checkPasswordAgeAndAuthorElastic')
const resetPassword = require('./resetPasswordElastic')
const grantAccess = require('./grantAccessElastic')

const verifyEmail = async ({ _userId, code, ip, userAgent }) => {
  // Get user data
  const userResponse = await elastic.getById({ index: 'users', id: _userId })
  const user = userResponse._source

  // Check if the token was issued
  // await verifyToken({ _userId, user, code, ip, userAgent })

  const passwordMustBeChanged = await checkPasswordAgeAndAuthor({ _userId, user })
  if (passwordMustBeChanged) return resetPassword(_userId)
  return grantAccess
}

module.exports = verifyEmail
