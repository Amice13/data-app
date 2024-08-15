const checkFile = require('./checkFile')
const checkOrganization = require('./checkOrganization')
const { CustomException } = require('@api-helpers/customException')

const checkEmbeddedFields = async (body) => {
  // Process image if exists
  if (body.image && body.image?.[0]?.path) {
    delete body.image[0].base64
    const fileId = await checkFile(body.image[0])
    if (fileId) body.image[0].id = fileId
    if (!fileId) delete body.image
  }
  if (body.organization?.id) {
    const organization = await checkOrganization(body.organization.id)
    if (!organization) throw CustomException(404, 'User organization is not found')
  }

  if (body.responsibleOrganization?.length) {
    for (let ro of body.responsibleOrganization) {
      const responsibleOrganization = await checkOrganization(ro.id)
      if (!responsibleOrganization) throw CustomException(404, 'User organization is not found')
    }
  }
  return body
}

module.exports = checkEmbeddedFields
