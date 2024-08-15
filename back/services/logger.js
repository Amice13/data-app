const { createLogger, transports, format } = require('winston')

const logger = createLogger({
  level: 'debug',
  format: format.json(),
  transports: [
    new transports.File({
      filename: 'logs/errors.log'
    })
  ]
})

module.exports = logger
