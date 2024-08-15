const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')
const elastic = require('@api-databases/elastic')
const { sendEmail } = require('@api-services')
const createUser = require('./createUserElastic')
const generatePassword = require('./generatePasswordElastic')
const generateToken = require('./generateTokenElastic')

const intialize = async ({ body, language }) => {
  // The database of users must be empty (users can make a mistake,
  // so we check only users with a confirmed email)
  // If the collection contains verified users, then reject
  let response = await elastic.get({ index: 'users', filters: { verified: true, role: 'Admin' }, size: 0 })

  const numberOfUsers = response?.hits?.total?.value || 0
  if (numberOfUsers > 0) {
    throw CustomException(403, 'You can\'t create an admin user. The collection contains the admin user.')
  }

  // Remove all uncomfirmed users
  await elastic.remove({ index: 'users', filters: { verified: false }})
  
  // Create a new admin user
  const user = await createUser(body)
  const password = await generatePassword(user._id)
  const token = await generateToken(user._id)

  // Prepare a link to send a confirmation code
  const url = `${appConfig.origin}/login?type=confirmation&confirmation=${token}`

  // Send an email
  await sendEmail({
    template: 'confirmation',
    language,
    to: body.email,
    data: { url }
  })

  return { password, token }
}
 
module.exports = intialize
