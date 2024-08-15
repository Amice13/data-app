// App settings
module.exports = {
  // Application name for package.json
  appName: process.env.APP_NAME || 'test',

  // App name for emails and other communications
  appFullName: 'My boilerplate',
  description: 'Cool description',
  version: '0.1.0',

  // An author or an owner of the app
  ownership: '@Amice13',

  // Redirect if the api path does not exist
  apiGlobalRedirect: '',

  // App metadata
  license: 'MIT',
  licenseUrl: 'https://spdx.org/licenses/MIT.html',
  contactName: 'Kyrylo Zakharov',
  contactUrl: 'https://github.com/Amice13',
  contactEmail: 'kirillzakharov13@gmail.com',

  // API documentation
  apiVersion: '0.1.0',
  apiDocs: true,

  // Server settings
  rootURL: 'https://localhost:3000',
  basePath: '/api',
  host: 'http://localhost',
  port: 3000,
  origin: 'https://localhost:8080',

  // Public assets
  publicFolder: 'api/public',

  // Security settings
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'test_env',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET ||  'test_env',
  maxPasswordAge: 90, // in days
  maxAdminPasswordAge: 30, // in days
  restrictOldPasswords: 5, // Number of old passwords that can't be set 
  accessTokenDuration: 15 * 60 * 1_000,
  refreshTokenDuration: 7 * 24  * 60 * 60 * 1_000,
  totpVerification: true,
  emailVerification: false,
  emailTokenComplexity: 8,
  smsVerification: false,
  emailMaxTries: 5,
  passwordMaxTries: 5,
  totpMaxTries: 5,
  smsMaxTries: 5,
  retryDelay: 3600, // in seconds
  bruteforcePolicy: 'Block users',

  // MSAL data
  msAppClientId: '4f92930c-13d8-4c36-95d6-2f2d31727e6e',
  msAppAuthority: 'https://sts.windows.net/e5c37981-6664-4134-8a0c-6543d2af80be/',

  // Email service
  emailTracking: true,
  emailHost: '',
  emailSender: '',
  emailPassword: process.env.EMAIL_PASSWORD || '',
  emailMSPowerAutomateURL: '',
  emailMSPowerAutomateAuth: process.env.EMAIL_POWER_AUTOMATE_AUTH || '',
}
