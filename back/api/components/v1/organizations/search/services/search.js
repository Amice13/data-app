const { appConfig } = require('@api-config')
const { search } = require('@api-databases/elastic')

const searchRecords = async (body) => {
  body.queryFields = ['name', 'legalName', 'code', 'translation.uk.name', 'translation.uk.legalName']
  body.index = 'organizations'
  body.fields = [
    'address.country.code',
    'address.pCode1',
    'address.pCode2',
    'address.pCode3',
    'address.pCode4',
    'address.street',
    'address.streetType',
    'address.translation',
    'address.building',
    'translation',
    'phone',
    'email',
    'website',
    'name',
    'code',
    'legalName',
    'description',
    'status',
    'type',
    'functionalType',
    'tags'
  ]
  const records = await search(body)
  const count = records.hits.total.value
  const items = records.hits.hits.map(el => {
    const data = el._source
    data.id = el._id
    return data
  })
  return { count, items }
}
 
module.exports = searchRecords
