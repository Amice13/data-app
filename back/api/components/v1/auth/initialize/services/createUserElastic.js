const elastic = require('@api-databases/elastic')

const getAdminUser = () => {
  return {
    isSuperUser: true,
    role: ['Admin'],
    mfa: 'Not initiated',
    privacyConsent: true,
    status: 'Active',
    createdAt: new Date()
  }
}

const createUser = async (body) => {
  Object.assign(body, getAdminUser())
  const response = await elastic.create({ index: 'users', body })
  return response
}

module.exports = createUser
