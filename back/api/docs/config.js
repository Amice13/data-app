const config = require('@api-config').appConfig
const { docs, configs } = require('@api-helpers')

const paths = {}
for (let [path, pathConfig] of Object.entries(configs)) {
  path = path.replace(/(?<=\/)(_.*?)(?=\/|$)/g, '{$1}')
  // Bypass the doc that must not be published
  if (!pathConfig.docIsPublic) continue
  const doc = docs[path]
  for (let p of Object.keys(doc)) {
    // Remove root path
    const currentPath = path + (p.length > 1 ? p : '')
    paths[currentPath] = doc[p]
  }
}
const swaggerDefinition = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: config.appFullName,
      version: config.apiVersion,
      description: config.description,
      license: {
        name: config.license,
        url: config.licenseUrl,
      },
      contact: {
        name: config.contactName,
        url: config.contactUrl,
        email: config.contactEmail,
      },
    },
    securityDefinitions: {
      Bearer: {
        name: 'Authorization',
        in: 'header',
        type: 'apiKey'
      }
    },
    servers: [
      {
        url: config.host + (config.port ? `:${config.port}` : ''),
        description: 'Main production server'
      },
    ],
    paths
  },
  apis: ['./routes/*.js'],
}

module.exports = swaggerDefinition
