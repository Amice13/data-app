const { Email } = require('@api-models')

const setEmailOpened = async (_id) => {
  await Email.updateOne({ _id }, { $set: { status: 'Opened' }})
  return true
}

module.exports = setEmailOpened
