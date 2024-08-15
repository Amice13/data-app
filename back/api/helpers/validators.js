// Get all js files from components
const path = require('node:path')
const { readdirSync } = require('fs')
const root = path.join(__dirname, '..', 'components')
const files = readdirSync(root, { recursive: true })

// Get all validators
const validators = files.
  filter(el => el.match(/\.validator\.js$/)).
  filter(el => !el.match(/_id\.validator\.js$/)).
  reduce((acc, el) => {
    const name = el.match(/(?<=\/)[^\/]*?(?=\.validator\.js$)/)[0]
    acc[name] = require(path.join(root, el))
    return acc
  }, {})

module.exports = validators
