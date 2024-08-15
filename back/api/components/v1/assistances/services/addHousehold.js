const elastic = require('@api-databases/elastic')
const equal = require('deep-equal')

const addHousehold = async (household) => {
  const householdRequest = await elastic.search({
    index: 'households',
    filters: { householdId: household.householdId }
  })
  let id
  // If the person does not exist, then create one
  if (!householdRequest?.hits?.total?.value) {
    const newHousehold = await elastic.create({ index: 'households', body: household })
    id = newHousehold._id
  }
  // If person exists we should update it if necessary
  if (householdRequest?.hits?.total?.value) {
    const existedRecord = householdRequest.hits.hits[0]._source
    id = householdRequest.hits.hits[0]._id
    const householdIsChanged = !equal(existedRecord, household)
    if (householdIsChanged) {
      await elastic.updateById({ index: 'households', id, body: household })
    }
  }
  household.id = id
  return household
}
 
module.exports = addHousehold
