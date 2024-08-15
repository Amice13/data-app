/**
* This function creates the cache which is synced with a local file to keep the list of the blacklisted tokens
*/

// Constants
const ACCESS_TOKEN_DURATION = process.env.ACCESS_TOKEN_DURATION || 15

// Modules
const fs = require('fs')
const NodeCache = require('node-cache')

// The path to keep the list of tokens
const cacheFilePath = './logs/blacklist.log'

// The cache initialization
const cache = new NodeCache()

// Load cache from file on startup
try {
  if (fs.existsSync(cacheFilePath)) {
    const cacheData = fs.readFileSync(cacheFilePath, 'utf8')
    cache.mset(JSON.parse(cacheData))    
  }
} catch (error) {
  console.error('Error loading cache from file:', error.message)
}

// Sync the actual list of blacklisted tokens with the local file if the process dies
process.on('uncaughtException', function (err) {
  fs.writeFileSync(cacheFilePath, JSON.stringify(cache.data))
})

// Additional setInterval can be implemented if multicore feature is used
// But in this case it is better to use REDIS instead of node-cache

// Add a blacklisted token
const add = token => {
  cache.set(token, 1, ACCESS_TOKEN_DURATION)
  return { result: 'success' }
}

const has = token => {
  return cache.has(token)
}

module.exports = { add, has }
