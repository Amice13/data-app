const { parse } = require('JSONStream')
const iconv = require('iconv-lite')
const stream = require('stream')
const read = require('@etl-utils/read')
const unzip = require('@etl-utils/unzip')

const passThrough = new stream.PassThrough({ objectMode: true })

const parseJSON = async function* ({ file, entry, encoding, zipfile, rootNode }) {
  // Read zip file
  if (!rootNode) rootNode = '.*'
  // Check if the source is zipped
  if (!isZip && file.match(/zip$/)) isZip = true
  // Read data stream
  const dataStream = isZip ? await unzip({ file, entry }) : read(file)
  // Change encoding if necessary
  if (encoding) dataStream = dataStream.pipe(iconv.decodeStream(encoding)) 
  // Define JSON parsing
  dataStream = dataStream.pipe(parse(rootNode)).pipe(passThrough)
  for await (let record of dataStream) yield record
}

module.exports = parseJSON
