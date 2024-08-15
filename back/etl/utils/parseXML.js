const { XMLParser } = require('fast-xml-parser')
const iconv = require('iconv-lite')
const { read } = require('@etl-utils')
const { unzip } = require('@etl-utils')

// Default XML parser options
const options = {
  attributeNamePrefix : "@_",
  attrNodeName: "attr",
  textNodeName : "#text",
  ignoreAttributes : false,
  ignoreNameSpace : true,
  allowBooleanAttributes : false,
  parseNodeValue : false,
  parseTagValue: false,
  parseAttributeValue : false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  arrayMode: false, //"strict"
  htmlEntities: true,
  // attributeValueProcessor: (attr, val) => he.decode(val, { isAttributeValue: true }),
  // tagValueProcessor: (attr, val) => he.decode(val),
  stopNodes: ['parse-me-as-string']
}
const parser = new XMLParser(options)

// Custom XML parser
const getXML = function* (chunk, rootNode, encoding, cache = {}) {
  if (!('data' in cache)) {
    cache.data = chunk
    const startIndex = cache.data.indexOf(`<${rootNode}`)
    if (startIndex > -1) cache.data = cache.data.slice(startIndex)
  } else {
    cache.data = Buffer.concat([cache.data, chunk])
  }

  // Check if text contains the full object
  let endIndex = cache.data.indexOf(`/${rootNode}>`)
  while (endIndex > -1) {
    let split = endIndex + `/${rootNode}>`.length
    let object = cache.data.slice(0, split)
    cache.data = cache.data.slice(split)
    endIndex = cache.data.indexOf(`/${rootNode}>`)
    object = encoding ? iconv.decode(object, encoding) : object.toString()
    yield object
  }
}

const parseXML = async function* ({ file, entry, rootNode, encoding, isZip }) {
  // Check if the source is zipped
  if (!isZip && file.match(/zip$/)) isZip = true
  // Read data stream
  const dataStream = isZip ? await unzip({ file, entry }) : read(file)
  // Process chunks
  for await (let chunk of dataStream) {
    // Read XML entities
    const xmlGenerator = getXML(chunk, rootNode, encoding)
    for (const item of xmlGenerator) yield parser.parse(item, options)
  }
}

module.exports = parseXML
