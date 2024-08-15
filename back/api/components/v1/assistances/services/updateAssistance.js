const { updateById, updateByIdNested } = require('@api-databases/elastic')
const checkEmbeddedFields = require('./checkEmbeddedFields')
const addPerson = require('./addPerson')

const updateAssistance = async (body) => {
  const newBody = JSON.parse(JSON.stringify(body))
  const index =  'assistances'

  // Check the fields
  body = await checkEmbeddedFields(body)

  // Add people and households
  if (body.headOfHousehold?.fullName) await addPerson(headOfHousehold)
  if (body.household) await addHousehold(body.household)

  const { id } = body
  delete body.id

  // Update nested fields
  const updateNestedItems = await updateByIdNested({ index, id, body, nested: 'items' })
  if (body.strings) await updateByIdNested({ index, id, body, nested: 'strings' })
  delete body.items
  delete body.strings

  // Update main data
  const result = await updateById({ index, body, id })
  return newBody
}
 
module.exports = updateAssistance
