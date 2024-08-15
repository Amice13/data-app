const StreamZip = require('node-stream-zip')

const unzipFile = async ({ file, entry }) => {
  const zip = new StreamZip.async({ file })
  const stream = await zip.stream(entry).catch(err => {
    // insert logger
    // console.log(err.message, err.name, err.fileName, err.stack)
    return []
  })
  stream.on('end', () => zip.close())
  return stream
}

module.exports = unzipFile
