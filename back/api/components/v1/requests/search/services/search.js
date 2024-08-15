const { appConfig } = require('@api-config')
const { search } = require('@api-databases/elastic')

const searchRecords = async (body) => {
  body.index = 'requests'
  body.queryFields = [
    'publicId',
    'organization.name',
    'organization.translation.uk.fullName',
    'responsibleOrganization.name',
    'responsibleOrganization.translation.uk.fullName',
    'fundedBy.name',
    'fundedBy.translation.uk.fullName',
  ]
  body.fields = [
    'publicId',
    'bundleName',
    'distributionModality',
    'distributionType',
    'populationType',
    'date',
    'assignees',
    'address',
    'createdBy',
    'createdByEmail',
    'createdAt',
    'items',
    'status',
    'organization',
    'responsibleOrganization',
    'fundedBy',
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
