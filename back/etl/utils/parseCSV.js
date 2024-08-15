const fs = require('fs')
const StreamZip = require('node-stream-zip')
const iconv = require('iconv-lite')
const { parse } = require('csv-parse')

const parseCSV = async function* ({ file, entry, delimiter, encoding, isZip, columns }) {
  // Define parser
  const csvParser = parse({
    delimiter,
    columns: true,
    record_delimiter: '\n',
    relax_column_count: true,
    skip_empty_lines: true,
    skip_records_with_error: true,
    skipRecordsWithError: true,
    trim: true,
    columns: ['surname', 'name', 'patronynic', 'birthday', 'address']
  })

  // Read zip file
  let data

  // Unzip file
  if (!zipfile && file.match(/zip$/)) zipfile = true
  if (zipfile) {
    const zip = new StreamZip.async({ file })
    data = await zip.stream(entry).catch(err => {
      console.log(err.message, err.name, err.fileName, err.stack)
      return []
    })
  } else {
    data = fs.createReadStream(file, { highWaterMark: 256 })
  }
  let parser = data
  if (encoding) parser = parser.pipe(iconv.decodeStream(encoding)) 
  parser = parser.pipe(csvParser)
  for await (let record of parser) {
    yield record
  }
}

module.exports = parseCSV