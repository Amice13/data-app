const { posthooks, CustomException } = require('@api-helpers')

module.exports = async (req, res, next) => {
  if (!posthooks[req.key]) return next()
  // Save original json method
  const sourceJson = res.json
  // Override res.send to modify the response body
  res.json = function (body) {
    try {
      // Make the default response
      const response = posthooks[req.key](body)
      sourceJson.call(this, response)
    } catch (err) { console.log(err) }
  }
  return next()
}
