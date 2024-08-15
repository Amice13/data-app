const getIndicators = require('./validators/get-indicators')

const post = {
  body: getIndicators.body
}

module.exports = {
  post
}
