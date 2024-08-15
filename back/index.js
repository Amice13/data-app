require('dotenv').config()
require('./aliases')
require('./api/server')

// const auth = require('@api-middleware/auth')

// auth()

// const parseXML = require('./etl/utils/parseXML')

// const start = async () => {
//   const xml = parseXML({
//     file: './etl/temp/17-ex_xml_rgf.zip',
//     entry: '17.3-ex_xml_rgo.xml',
//     encoding: 'cp1251',
//     rootNode: 'RECORD'
//   })
//   for await (let item of xml) {
//     console.log(item)
//   }
// }

// start()
