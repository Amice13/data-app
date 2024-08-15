const elastic = require('@api-databases/elastic')
const equal = require('deep-equal')

const addPerson = async (headOfHousehold) => {
  const personRequest = await elastic.search({
    index: 'people',
    filters: { taxId: headOfHousehold.taxId }
  })
  let id
  // If the person does not exist, then create one
  if (!personRequest?.hits?.total?.value) {
    const newPerson = await elastic.create({ index: 'people', body: headOfHousehold })
    id = newPerson._id
  }
  // If person exists we should update it if necessary
  if (personRequest?.hits?.total?.value) {
    const existedRecord = personRequest.hits.hits[0]._source
    id = personRequest.hits.hits[0]._id
    const personIsChanged = !equal(existedRecord, headOfHousehold)
    if (personIsChanged) {
      await elastic.updateById({ index: 'people', id, body: headOfHousehold })
    }
  }
  headOfHousehold.id = id
  return headOfHousehold
}
 
module.exports = addPerson
