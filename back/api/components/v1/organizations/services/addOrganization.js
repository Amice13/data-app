const elastic = require('@api-databases/elastic')
const checkFile = require('./checkFile')

const addOrganization = async (body) => {
  // Process logo if exists
  if (body.logo && body.logo?.[0]?.path) {
    delete body.logo[0].base64
    const fileId = await checkFile(body.logo[0])
    if (fileId) body.logo[0].id = fileId
    if (!fileId) delete body.logo
  }
  const result = await elastic.create({ index: 'organizations', body })
  body.id = result._id

  return body
}
 
module.exports = addOrganization
