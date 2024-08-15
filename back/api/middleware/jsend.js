/**
* This is utility to unify outputs of different libaries to JSEND standard
* https://github.com/omniti-labs/jsend
*/

const defaultResponse = {
  status: 'success',
  data: {}
}

const unifyResponse = (req, res, next) => {
  if (req.path === '/api/v1/users/me') return next()
  // Save original json method
  const sourceJson = res.json
  // Override res.send to modify the response body
  res.json = function (body) {
    // Make the default response
    const response = Object.assign({}, defaultResponse)
    // Normalize the data output
    if (typeof body === 'object' && !body.data) {
      response.data = body
      return sourceJson.call(this, response)
    }
    // Return errors
    sourceJson.call(this, body)
  }
  return next()
}

module.exports = unifyResponse
