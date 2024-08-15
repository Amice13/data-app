const processBody = (body) => {
  body.email = body.email.toLowerCase().trim()
  return body
}

module.exports = {
  processBody
}
