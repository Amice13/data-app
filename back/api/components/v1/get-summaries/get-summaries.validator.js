const getSummary = require('./validators/get-summary')

const post = {
  body: getSummary.body
}

module.exports = {
  post
}
