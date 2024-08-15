// Logger definition
const path = require('node:path')
const { transports, createLogger, format } = require('winston')
const filename = path.join(__dirname, '..', '..', 'logs', 'api-errors.log')
const customTransports = process.env.IS_DEV === 'TRUE' ? [new transports.Console()] : [new transports.File({ filename })]

const logger = createLogger({
  level: 'debug',
  format: format.json(),
  transports: customTransports
})

module.exports = logger
