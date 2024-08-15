const shortDate = () => { return new Date().toLocaleString(['uk-UA'], { day: '2-digit', month: '2-digit', year: 'numeric' }) }

// Default messages
const messages = {
  defaults: require('./messages/defaults'),
  bruteforce: require('./messages/bruteforce'),
  code: require('./messages/code'),
  confirmation: require('./messages/confirmation'),
  invite: require('./messages/invite'),
  reset: require('./messages/reset')
}

const createTemplate = ({ templateName, data, language }) => {
  language = language || 'en'
  // Get the default values for email
  const { defaults } = messages
  // Get specific values for the email
  const message = messages[templateName]
  if (!messages[templateName]) throw 'Email template is not found. Please, contact the administator.'

  // Get the messages in the proper language
  const localizedDefaults = defaults[language] || base.en
  const localizedMessage = message[language] || message.en
  const body = Object.assign({}, localizedMessage)
  let template = localizedMessage.template

  // Insert default values
  for (let [key, value] of Object.entries(localizedDefaults)) {
    template = template.replace(new RegExp(`~~ *${key} *~~`, 'g'), value)
  }
  // Insert data in the template
  for (let [key, value] of Object.entries(data)) {
    template = template.replace(new RegExp(`~~ *${key} *~~`, 'g'), value)
  }
  // Insert data in the body
  for (let [key, value] of Object.entries(data)) {
    body.htmlText = body.htmlText.replace(new RegExp(`~~ *${key} *~~`, 'g'), value)
  }
  // Insert processed body and title to the message
  for (let [key, value] of Object.entries(body)) {
    template = template.replace(new RegExp(`~~ *${key} *~~`, 'g'), value)
  }
  return { result: 'success', data: { text: template, subject: `${shortDate()} - ${body.title}` } }
}

module.exports = createTemplate
