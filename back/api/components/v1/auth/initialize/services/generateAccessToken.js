const jwt = require('jsonwebtoken')
const { appConfig } = require('@api-config')
const { accessTokenSecret, refreshTokenDuration, basePath } = appConfig

const generateToken = async (_userId) => {
  const token = jwt.sign({
    sub: _userId,
    aud: basePath + '/v1/auth/confirm'
  }, accessTokenSecret, {
    expiresIn: refreshTokenDuration
  })
  return token
}

module.exports = generateToken
