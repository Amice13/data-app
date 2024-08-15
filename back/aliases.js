const moduleAlias = require('module-alias')
const path = require('node:path')

// Setup module aliases
moduleAlias.addAliases({
  '@root'  : __dirname,
  '@api-common': path.resolve('api', 'helpers', 'common'),
  '@api-components': path.resolve('api', 'components', 'v1'),
  '@api-config': path.resolve('config', process.env.IS_DEV === 'TRUE' ? 'dev' : 'prod'),
  '@api-databases': path.resolve('api', 'databases'),
  '@api-elastic': path.resolve('api', 'helpers', 'elasticModels'),
  '@api-helpers': path.resolve('api', 'helpers'),
  '@api-logger': path.resolve('api', 'services', 'logger'),
  '@api-middleware': path.resolve('api', 'middleware'),
  '@api-models': path.resolve('api', 'helpers', 'models'),
  '@api-services': path.resolve('api', 'services'),
  '@api-validators': path.resolve('api', 'helpers', 'validators'),
  '@etl-utils': path.resolve('etl', 'utils'),
})

moduleAlias()
