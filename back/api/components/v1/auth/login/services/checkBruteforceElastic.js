const elastic = require('@api-databases/elastic')
const { appConfig } = require('@api-config')
const { CustomException } = require('@api-helpers/customException')
const logActivity = require('./logActivityElastic')

const types = {
  'Invalid password': {
    duration: 60,
    maxTries: appConfig.passwordMaxTries,
  },
  'Invalid email': {
    duration: 2,
    maxTries: appConfig.emailMaxTries,
  },
  'Invalid TOTP': {
    duration: 0.5,
    maxTries: appConfig.totpMaxTries,
  },
  'Invalid SMS': {
    duration: 1,
    maxTries: appConfig.smsMaxTries,
  }
}

const checkBruteforce = async ({ eventDetail, _userId, user, userAgent, ip }) => {
  const { duration, maxTries } = types[eventDetail]

  // Find the recent log
  const logsResponse = await elastic.get({
    index: 'userlog',
    filters: { _userId, eventDetail },
    sort: {
      key: 'createdAt',
      mode: 'desc'
    },
    size: 1
  })

  if (logsResponse.hits?.total?.value && logsResponse.hits.total.value > maxTries) {
    // Block user if the policy is set
    if (appConfig.bruteforcePolicy === 'Block users') {
      await elastic.updateById({ index: 'users', id: _userId, body: { status: 'Blocked' } })
      throw CustomException(403, 'Too many tries to log in. User is blocked. Contact the administator')
    }
    // Delay the try
    const difference = (new Date() - new Date(logsResponse.hits.hits[0]._source.createdAt)) / 1000
    const requiredTime = difference = appConfig.retryDelay - difference
    if (requiredTime > 0) {
      await logActivity({
        _userId, userAgent, ip,
        email: user.email,
        organization: user.organization?.id,
        eventType: 'Failed sign in',
        eventDetail: 'Too many retries'
      })
      throw (403, 'Too many tries to log in. You will be able to log in after ' + requiredTime + ' seconds' )
    }
  }
  return true
}

module.exports = checkBruteforce
