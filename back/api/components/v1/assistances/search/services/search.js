const { appConfig } = require('@api-config')
const { search } = require('@api-databases/elastic')

const searchRecords = async (body) => {
  body.index = 'assistances'
  body.queryFields = [
    'headOfHousehold.fullName',
    'headOfHousehold.translation.uk.fullName',
    'headOfHousehold.taxId',
  ]
  // body.fields = [
  //   'date',
  //   'publicId',
  //   'bundleName',
  //   'distributionModality',
  //   'distributionType',
  //   'populationType',
  //   'origin',
  //   'createdBy',
  //   'createdByEmail',
  //   'createdAt',
  //   'items',
  //   'status',
  //   'organization',
  //   'responsibleOrganization',
  //   'fundedBy',
  //   'signature',
  //   'tags'
  // ]
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
