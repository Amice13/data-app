const { User } = require('@api-helpers').models

const createUser = async (body) => {
  const newUser = new User(adminUser)
  let user = await newUser.save()
  return user
}

module.exports = createUser
