// Require all base packages
require('@api-databases/mongo')
require('@api-elastic')

// Utils
const { dirname, join } = require('path')

// Server app
const express = require('express')
// Get the app config
const { appConfig } = require('@api-config')
// Get the global middleware
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser', { limit: '1mb' })
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const responseTime = require('response-time')
const elastic = require('./databases/elastic')

// Custom middleware
//require('@api-helpers')
const {
  accessLogger,
  jsend,
  errorHandler,
  custom404
} = require('@api-middleware')
// Create an app
const app = express()

// Log all requests to the server
app.use(accessLogger)
// Add response time to the response headers
app.use(responseTime())
// Basic security features
app.use(helmet({ crossOriginResourcePolicy: false }))
// Parsing of the body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Parsing of cookies
app.use(cookieParser())
// Limit the API for browsers
app.use(cors({ origin: appConfig.origin, credentials: true, sameSite: 'none' }))
// Serve static assets if necessary (this should be disabled if the reverse proxy is used)
const staticAssetsPath = join(dirname(require.main.filename), ...appConfig.publicFolder.split(/\//g))
app.use('/static', express.static(staticAssetsPath))

// Hanlde files uploading
app.use(fileUpload({ createParentPath: true }))

// Unify the response to the JSEND standard
app.use(jsend)
// Execute the dedicated controllers with routes
app.use(appConfig.basePath, require('./router'))
// Handle all errors
app.use(errorHandler)

// API docs
if (appConfig.apiDocs) {
  const swaggerUi = require('swagger-ui-express')
  const swaggerConfig = require('./docs/config')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig.definition, { explorer: true }))
}
// Common path to catch all
app.all('*', custom404)

module.exports = app
