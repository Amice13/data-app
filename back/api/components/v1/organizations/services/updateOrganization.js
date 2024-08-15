const elastic = require('@api-databases/elastic')
const checkFile = require('./checkFile')

const updateOrganization = async (body) => {
  // Process logo if exists
  if (body.logo && body.logo?.[0]?.path) {
    delete body.logo[0].base64
    const fileId = await checkFile(body.logo[0])
    if (fileId) body.logo[0].id = fileId
    if (!fileId) delete body.logo
  }
  const { id } = body
  delete body.id

  const result = await elastic.updateById({ index: 'organizations', body, id })
  body.id = result._id
  return body
}
 
module.exports = updateOrganization
