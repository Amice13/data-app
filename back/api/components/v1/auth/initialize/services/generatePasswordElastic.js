const bcrypt = require('bcrypt')
const elastic = require('@api-databases/elastic')
const passwordGenerator = require('generate-password')

const generatePassword = async (_userId) => {
  const rawPassword = passwordGenerator.generate({ length: 10, numbers: true, symbols: true, strict: true })
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(rawPassword, salt)
  await elastic.create({ index: 'passwords', body: {
    _userId,
    password,
    createdAt: (() => { return new Date() })()
  }})
  return rawPassword
}

module.exports = generatePassword