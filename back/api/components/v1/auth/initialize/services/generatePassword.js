const passwordGenerator = require('generate-password')

const { Password } = require('@api-helpers').models

const generatePassword = async (_userId) => {
  const password = passwordGenerator.generate({ length: 10, numbers: true, symbols: true, strict: true })
  const newPassword = new Password({
    _userId,
    password,
    createdAt: (() => { return new Date() })()
  })
  await newPassword.save()
  return password
}

module.exports = generatePassword