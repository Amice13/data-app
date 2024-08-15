const { appConfig } = require('@api-config')
const { Email } = require('@api-models')

const trackerURL = `${appConfig.rootURL}/api/v1/emails`

const generateTracker = async (email) => {
  if (!appConfig.emailTracking) return {}
  const tracker = new Email({ status: 'Created', email })
  const savedTracker = await tracker.save()
  return { _id: savedTracker._id, url: `${trackerURL}/${savedTracker._id}` }
}

module.exports = generateTracker
