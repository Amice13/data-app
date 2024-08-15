const { appConfig } = require('@api-config')
const { search } = require('@api-databases/elastic')

const searchRecords = async (body) => {
  body.queryFields = [
    'person.fullName',
    'email',
    'person.translation.uk.fullName',
    'translation.uk.legalName']
  body.index = 'users'
  body.fields = [
    'email',
    'verified',
    'role',
    'person',
    'organization.name',
    'organization.translation.uk.name',
    'jobTitle',
    'image.path',
    'tags',
    'createdAt',
    'createdBy',
    'email',
    'person.tags',
    'person.gender',
    'person.phone',
    'person.email',
    'person.website',
    'person.fullName',
    'person.givenName',
    'person.familyName',
    'person.additionalName',
    'status',
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
