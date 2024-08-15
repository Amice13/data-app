const elastic = require('@api-databases/elastic')

const logActivity = async ({ _userId, email, organization, userAgent, ip, eventType, eventDetail }) => {
  await elastic.create({
    index: 'userlog',
    body: {
      _userId,
      email,
      organization,
      userAgent,
      ip,
      eventType,
      eventDetail,
      createdAt: new Date()
    }
  })
  return true
}

module.exports = logActivity
