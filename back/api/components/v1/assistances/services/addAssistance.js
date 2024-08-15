const elastic = require('@api-databases/elastic')
const checkEmbeddedFields = require('./checkEmbeddedFields')
const addPerson = require('./addPerson')
const addHousehold = require('./addHousehold')

const addAssistance = async (body) => {
  body = await checkEmbeddedFields(body)
  if (body.headOfHousehold?.fullName) await addPerson(headOfHousehold)
  if (body.household) await addHousehold(body.household)
  const result = await elastic.create({ index: 'assistances', body })
  body.id = result._id
  return body
}
 
module.exports = addAssistance
