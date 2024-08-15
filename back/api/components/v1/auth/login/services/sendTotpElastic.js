const { sign } = require('jsonwebtoken')
const speakeasy = require('@levminer/speakeasy')
const { QRCodeCanvas } = require('@loskir/styled-qr-code-node')
const elastic = require('@api-databases/elastic')
const { appConfig } = require('@api-config')
const logActivity = require('./logActivityElastic')

const label = 'OTP'
const issuer =  appConfig.appFullName

const sendTotp = async ({ _userId, user, ip, userAgent }) => {

  // Create a cookie token
  const cookieToken = sign({
    sub: _userId,
    aud: `${appConfig.rootURL}/api/v1/auth/totp-verify`
  }, appConfig.accessTokenSecret, { expiresIn: 1000 * 60 * 20 })

  // If the secret for the user is set, then send user to the simplified form 
  if (user.mfa === 'TOTP is set') {
    return {
      setToken: cookieToken,
      data: { nextStep: 'loginOtp' }
    }
  }

  // Create a secret for a one time password
  const secret = speakeasy.generateSecret()
  let url = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: `${label}:${user.email}`,
    issuer: issuer
  })

  // Generate a QR code to send to the user's auth app
  const qrCode = new QRCodeCanvas({
    width: 300,
    height: 300,
    type: 'svg',
    data: url,
    dotsOptions: { color: '#4267b2', type: 'rounded' },
    backgroundOptions: { color: '#FFF', },
    imageOptions: { crossOrigin: 'anonymous', margin: 20 }
  })
  const svg = await qrCode.toDataUrl('svg')

  // Save infromation about the token
  await elastic.updateById({ id: _userId, index: 'users', body: { secret: secret.base32, mfa: 'Secret is issued'}})

  // Log the event
  await logActivity({
    _userId,
    email: user.email,
    organization: user.organization?.id,
    userAgent, ip,
    eventType: 'Log in',
    eventDetail: 'TOTP token is issued'
  })

  return {
    setToken: cookieToken,
    data: { nextStep: 'loginQr', svg }
  }
}

module.exports = sendTotp
