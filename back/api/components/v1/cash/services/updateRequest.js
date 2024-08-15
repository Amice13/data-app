const { updateById, updateByIdNested } = require('@api-databases/elastic')
const checkEmbeddedFields = require('./checkEmbeddedFields')

const updateRequest = async (body) => {
  const newBody = JSON.parse(JSON.stringify(body))
  const index = 'requests'

  // Status can't be changed to requested if the distribution starts
  if (body.status === 'Requested') delete body.status

  // Main data can't be changed after the beginning of the distribution
  if (body.status !== 'Requested') {
    delete body.address
    delete body.bundleName
    delete body.publicId
    delete body.date
  }

  // Check the fields
  body = await checkEmbeddedFields(body)
  const { id } = body
  delete body.id

  // Update nested fields
  const updateNested = await updateByIdNested({ index, id, body, nested: 'items' })
  delete body.items

  // Update main data
  const result = await updateById({ index, body, id })
  return newBody
}
 
module.exports = updateRequest
