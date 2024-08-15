const setEmailOpened = require('./services/setEmailOpened')
const pixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
const pixelBuffer = Buffer.from(pixel, 'base64')

const controller = async (req, res, next) => {
  try {
    await setEmailOpened(req.params._id)
  } catch (err) {
    console.log(err)
  }
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': pixelBuffer.length
  })
  return res.end(pixelBuffer)
}

module.exports = controller
