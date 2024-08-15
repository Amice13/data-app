const fs = require('fs')
const path = require('node:path')
const morgan = require('morgan')

// Log errors
if (!fs.existsSync('logs')) fs.mkdirSync('logs')
const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', '..', 'logs', 'api-access.log'), { flags: 'a' })

module.exports = morgan('common', { stream: accessLogStream })