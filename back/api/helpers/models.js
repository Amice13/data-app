// Get all js files from components
const path = require('node:path')
const { readdirSync } = require('fs')
const root = path.join(__dirname, '..', 'components')
const files = readdirSync(root, { recursive: true })

// Get all models
const models = files.
  filter(el => el.match(/\.model\.js$/)).
  reduce((acc, el) => {
    const listOfModels = require(path.join(root, el))
    for (let [name, model] of Object.entries(listOfModels)) acc[name] = model
    return acc
  }, {})

module.exports = models
