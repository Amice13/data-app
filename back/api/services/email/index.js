// Logger
const config = require('@api-config/email')
const generateTracker = require('./helpers/generateTrackerElastic')
const createTemplate = require('./createTemplate')
const sendWithNodeMailer = require('./sendWithNodeMailer')
const sendWithPowerAutomate = require('./sendWithPowerAutomate')

const sendMail = async ({ template, language, from, to, data }) => {
  try {
  from = config.email
  let tracker
  if (config.trackEmails) {
    tracker = await generateTracker(to)
    data.trackerURL = tracker.url
  }
  const body = createTemplate({ templateName: template, data, language })
  const options = Object.assign({}, body.data, { from, to })
  let result
  if (config.emailService === 'microsoft') result = await sendWithFlow(options)
  if (config.emailService === 'nodemailer') {
    options.html = options.text
    result = await sendWithNodeMailer(options)
  }
  if (result.result === 'success' && tracker._id) {
    await Email.updateOne({ _id: savedTracker._id }, { status: 'Sent' })
  }
  return result
  } catch (err) {
    console.log(err)
  }
}

module.exports = sendMail
