const fs = require('fs') 
const path = require('node:path')

const certPath = path.join(__dirname, '..', 'keys', 'http_ca.crt')
const ca = fs.readFileSync(certPath)

module.exports = {
  node: process.env.ELASTIC_HOST,
  auth: {
    username: 'elastic',
    password: process.env.ELASTIC_PASSWORD
  },
  // caFingerprint: process.env.ELASTIC_FINGERPRINT,
  tls: {
    ca,
    rejectUnauthorized: false
  },
  numberOfShards: 1,
  dbPrefix: process.env.APP_NAME
}

