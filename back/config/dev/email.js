module.exports = {
  emailService: 'nodemailer',
  email: process.env.OAUTH_EMAIL,
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  trackEmails: false
  // emailHost: '',
  // emailPassword: process.env.EMAIL_PASSWORD
}
