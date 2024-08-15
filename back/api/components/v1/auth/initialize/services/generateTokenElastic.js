const crypto = require('crypto')
const elastic = require('@api-databases/elastic')
const passwordGenerator = require('generate-password')

const generateToken = async (_userId) => {
  const token = crypto.randomBytes(16).toString('hex')
  const body = { _userId, token, type: 'Email confirmation' }
  await elastic.create({ index: 'tokens', body })
  return token
}

module.exports = generateToken
