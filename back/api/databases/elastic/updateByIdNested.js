const { elastic } = require('@api-config')
const client = require('./client')
const getById = require('./getById')

/**
* This function updates the document in the Elasticsearch collection.
* It uses the following params:
* @param {body} - Contains the update body
* @param {id} - The unique identifier of the entity
* @param {index} - The name of the document in the collection
*/

const updateByIdNested = async ({ index, id, body, nested }) => {
  const _id = id
  const _index = `${elastic.dbPrefix}_${index}`
  // Get old entities
  const oldEntity = await getById({ index, id })
  const oldBody = oldEntity._source
  const oldItems = oldBody[nested]

  // Get keys to change
  const newKeys = body[nested].map(el => el.key)
  const oldKeys = oldItems.map(el => el.key)

  // Set the list of keys to remove
  const itemsToDelete = oldKeys.filter(key => !newKeys.includes(key)).map(key => {
    return { script: {
      source: `ctx._source.${nested}.removeIf(item -> item.key == params.key)`,
      params: { key }}
    }
  })

  // Set the list of items to add
  const itemsToAdd = body[nested].filter(item => !oldKeys.includes(item.key)).map(item => {
    return { script: {
      source: `ctx._source.${nested}.add(params.item)`,
      params: { item }}
    }
  })

  // Set the list of items to change
  const itemsToChange = body[nested].filter(el => {
    const oldItem = oldItems.find(item => item.key === el.key)
    if (!oldItem) return false
    return el.value !== oldItem.value
  }).map(item => {
    return { script: {
      source: `def targets = ctx._source.${nested}.findAll(item -> item.key == params.key); for(item in targets) { item.value = params.value }`,
      params: item
    }}
  })

  const bulkCommands = []
  for (let item of itemsToDelete) {
    bulkCommands.push({ update: { _id, _index }})
    bulkCommands.push(item)
  }
  for (let item of itemsToAdd) {
    bulkCommands.push({ update: { _id, _index }})
    bulkCommands.push(item)
  }
  for (let item of itemsToChange) {
    bulkCommands.push({ update: { _id, _index }})
    bulkCommands.push(item)
  }
  if (!bulkCommands.length) return []
  const result = await client.bulk({ refresh: true, body: bulkCommands })
  return result
}

module.exports = updateByIdNested
