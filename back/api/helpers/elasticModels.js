// Get all js files from components
const path = require('node:path')
const { readdirSync } = require('fs')

// Define the place where the components and models are stored 
const root = path.join(__dirname, '..', 'components')
const files = readdirSync(root, { recursive: true })

// Get Elastic client to add indices
const { createModel } = require('@api-databases/elastic')

// Get all models
const models = files.
  filter(el => el.match(/\.elastic\.js$/)).
  reduce((acc, el) => {
    const name = el.replace(/^.*?\/([^\/]+)\.elastic\.js/, '$1')
    const model = require(path.join(root, el))
    acc[name] = model
    return acc
  }, {})

// Create models
const addIndices = async () => {
  // Get all indices
  const indices = files.
    filter(el => el.match(/([^\/]*)\/\1\.elastic\.js$/)).
    map(el => el.replace(/^.*\/([^\/]+)\.elastic\.js$/, '$1'))

  for (let index of indices) {
    try {
      const mappings = models[index]
      await createModel({ index, mappings })
    } catch (error) {
      console.log(index, error)
    }
  }
}

addIndices()

module.exports = models
