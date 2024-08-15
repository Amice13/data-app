const { appConfig } = require('@api-config')
const { CustomException, models: { User } } = require('@api-helpers')
const createUser = require('./createUser')
const generatePassword = require('./generatePassword')
const generateToken = require('./generateToken')

const adminUser = {
  isSuperUser: true,
  role: ['Admin'],
  mfa: 'Not initiated',
  privacyConsent: true,
  status: 'Active',
  createdAt: (() => { return new Date() })()
}

const intialize = async (body) => {
  // The database of users must be empty (users can make a mistake, so we check only users with a confirmed email)
  let numberOfUsers = await User.countDocuments({ verified: true })

  // If the collection contains users, reject
  if (numberOfUsers > 0) throw CustomException(403, 'You can\'t create an admin user. The collection contains users already.')

  // Remove all uncomfirmed users
  await User.deleteMany({ verified: false })
  
  // Create a new admin user
  const user = await createUser(adminUser)
  const password = await generatePassword(user._id)
  const token = await generateToken(user._id)  

  // Send an email
  const url = `${appConfig.root}/auth/confirm`
  await sendConfirmationEmail({
    template: 'confirmation',
    language,
    to: body.email,
    data: { url }
  })
  return { password, token }
}
 
module.exports = intialize
