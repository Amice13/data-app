const fs = require('fs')

const read = (file) => {
  return fs.createReadStream(file, { highWaterMark: 256 })  
} 

module.exports = read
