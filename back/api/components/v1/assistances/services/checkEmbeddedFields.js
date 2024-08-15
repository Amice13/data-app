const checkUsers = require('./checkUsers')
const checkOrganizations = require('./checkOrganizations')
const { CustomException } = require('@api-helpers/customException')

const checkEmbeddedFields = async (body) => {
  if (body.organization?.id) {
    const organization = await checkOrganizations(body.organization.id)
    if (!organization) throw CustomException(404, 'User organization is not found')
  }
  if (body.responsibleOrganization?.id) {
    const organization = await checkOrganizations(body.responsibleOrganization.id)
    if (!organization) throw CustomException(404, 'User organization is not found')
  }
  if (body.fundedBy?.id) {
    const organization = await checkOrganizations(body.fundedBy.id)
    if (!organization) throw CustomException(404, 'User organization is not found')
  }
  if (body.assignees?.length) {
    for (let assignee of body.assignees) {
      const user = await checkUsers(assignee.id)
      if (!user) throw CustomException(404, 'User organization is not found')
    }
  }
  return body
}

module.exports = checkEmbeddedFields
