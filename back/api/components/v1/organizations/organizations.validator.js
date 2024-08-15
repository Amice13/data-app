const organizations = require('./validators/organizations')

const post = {
  body: organizations.body
}

module.exports = {
  post
}
