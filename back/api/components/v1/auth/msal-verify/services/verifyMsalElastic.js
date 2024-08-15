const { CustomException } = require('@api-helpers/customException')
const { appConfig } = require('@api-config')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')

const {
  getUser,
  logActivity,
  grantAccess,
} = require('@api-common')

const verifyMsal = async ({ token, ip, userAgent }) => {

  const decoded = jwt.decode(token, { complete: true })
  const { iss } = decoded.payload
  const { kid } = decoded.header

  const jwksUri = iss + 'discovery/v2.0/keys'
  var client = jwksClient({ jwksUri })
  const key = await client.getSigningKey(kid)

  const validationOptions = {
    issuer: appConfig.msAppAuthority
  }

  const signingKey = key.publicKey || key.rsaPublicKey
  let tokenContent
  try {
    tokenContent = jwt.verify(token, signingKey, { algorithms: ['RS256'] })
  } catch (err) {
    await logActivity({
      email, ip, userAgent,
      eventType: 'Failed sign in',
      eventDetail: 'Invalid MSAL'
    })
    throw CustomException(403, 'Your MSAL token is invalid')
  }
  const emails = [tokenContent.unique_name, tokenContent.upn].filter(Boolean).filter(el => el.match(/@/))
  if (!emails.length) throw CustomException(403, 'Your MSAL token does not contain email')
  const email = emails[0]

  const { _userId, user } = await getUser({ email, userAgent, ip }).catch(err => { return false })
  if (!user) throw CustomException(403, 'You are not authorized to use this app')

  if (user.status === 'Blocked') throw (403, 'User is blocked')

  return grantAccess({ _userId, user, ip, userAgent })
}

module.exports = verifyMsal
