// Get all js files from components
const path = require('node:path')
const { readdirSync } = require('fs')
const root = path.join(__dirname, '..', 'components')
const files = readdirSync(root, { recursive: true })

// Get all configs
const configs = files.
  filter(el => el.match(/\.config\.js$/)).
  reduce((acc, el) => {
    acc['/' + path.dirname(el)] = require(path.join(root, el))
    return acc
  }, {})

// Get all docs
const docs = files.
  filter(el => el.match(/\.doc\.js$/)).
  reduce((acc, el) => {
    const key = '/' + path.dirname(el).replace(/(?<=\/)(_.*?)(?=\/|$)/g, '{$1}')
    acc[key] = require(path.join(root, el))
    return acc
  }, {})

// Get all validators
const validators = files.
  filter(el => el.match(/\.validator\.js$/)).
  reduce((acc, el) => {
    acc['/' + path.dirname(el)] = require(path.join(root, el))
    return acc
  }, {})

// Get all controllers
const controllers = files.
  filter(el => el.match(/\.controller\.js$/)).
  reduce((acc, el) => {
    acc['/' + path.dirname(el)] = require(path.join(root, el))
    return acc
  }, {})

// Get all prehooks
const prehooks = files.
  filter(el => el.match(/\.prehook\.js$/)).
  reduce((acc, el) => {
    acc['/' + path.dirname(el)] = require(path.join(root, el))
    return acc
  }, {})

// Get all posthooks
const posthooks = files.
  filter(el => el.match(/\.posthook\.js$/)).
  reduce((acc, el) => {
    acc['/' + path.dirname(el)] = require(path.join(root, el))
    return acc
  }, {})

const CustomException = (code, message) => {
  const error = new Error(message)
  error.code = code
  return error
}

module.exports = {
  CustomException,
  configs,
  docs,
  validators,
  prehooks,
  controllers,
  posthooks
}
