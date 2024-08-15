const elastic = require('@api-databases/elastic')
const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')
const logActivity = require('./logActivityElastic')

const checkPasswordAgeAndAuthor = async ({ _userId, user }) => {
  // Get the most recent password of the user
  const passwordResponse = await elastic.get({
    index: 'passwords',
    filters: { _userId },
    size: 1
  })
  const password = passwordResponse.hits?.hits?.[0]?._source

  // Check if the password is not created by the user
  const wrongAuthor = password._userId !== _userId

  // Check if the password is old
  const differenceInDays = (new Date() - new Date(password.createdAt)) / 1000 / 60 / 60 / 24
  const maxDifference = user.role.includes('Admin') ? appConfig.maxAdminPasswordAge : appConfig.maxPasswordAge
  const passwordIsOld = differenceInDays > maxDifference

  return wrongAuthor || passwordIsOld
}

module.exports = checkPasswordAgeAndAuthor
