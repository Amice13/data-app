const { elastic } = require('@api-config')
const { client } = require('@api-databases/elastic')

const demographyStats = {
  all: { sum: { field: 'familyStats.all' } },
  girls: { sum: { field: 'familyStats.girls' } },
  boys: { sum: { field: 'familyStats.boys' } },
  women: { sum: { field: 'familyStats.women' } },
  men: { sum: { field: 'familyStats.men' } },
  seniorWoman: { sum: { field: 'familyStats.seniorWoman' } },
  seniorMan: { sum: { field: 'familyStats.seniorMan' } },
  disabled: { sum: { field: 'familyStats.disabled' } },
  vulnerable: { sum: { field: 'familyStats.vulnerable' } },
  households: { value_count: { field: 'publicId' } },
}

const filterTemplate = {
  filter: {
    nested: {
      path: 'items',
      query: { bool: { must: [] }}
    }
  },
  aggs: { ...demographyStats }
}

const anyFilter = (includeHouseholds = true) => {
  const currentFilter = JSON.parse(JSON.stringify(filterTemplate))
  currentFilter.filter.nested.query.bool.must = [{ range: { 'items.value': { gt: 0 }}}]
  if (!includeHouseholds) delete currentFilter.aggs.households
  return currentFilter
}

const baseFilter = (items, includeHouseholds = true) => {
  const currentFilter = JSON.parse(JSON.stringify(filterTemplate))
  currentFilter.filter.nested.query.bool.must = [
    { terms: { 'items.key': items } },
    { range: { 'items.value': { gt: 0 } } }
  ]
  if (!includeHouseholds) delete currentFilter.aggs.households
  return currentFilter  
}


const definitions = {
  nfi: [
    {
      output: 'Output 10B – Non-food items are provided to ensure sufficient basic and domestic items',
      indicator: '# households receiving UNHCR standard non-food items',
      definition: {
        filter: {
          nested: {
            path: 'strings',
            query: { bool: { must: [{ terms: { 'strings.value': ['Standard NFI'] } }] }}
          }
        },
        aggs: { ...demographyStats }
      }
    },
    {
      output: 'Output 10B – Non-food items are provided to ensure sufficient basic and domestic items',
      indicator: '# of elderly receiving incontinence items',
      definition: baseFilter(['Adult diapers'])
    },
    {
      output: 'Output 10B – Non-food items are provided to ensure sufficient basic and domestic items',
      indicator: '# of households receiving non-standard NFIs',
      definition: baseFilter([
        'Adult diapers', 'Baby diapers', 'Beds', 'Buckets', 'Folding beds',
        'Inflated mats', 'Partition', 'Other'
      ])
    },
    {
      output: 'Output 10B – Non-food items are provided to ensure sufficient basic and domestic items',
      indicator: '# of households supported with heating appliances (in-kind)',
      definition: baseFilter(['Heaters'])
    },
    {
      output: 'Output 10B – Non-food items are provided to ensure sufficient basic and domestic items',
      indicator: '# of people benefiting from generators',
      definition: baseFilter(['Generators'])
    },
    {
      output: 'Output 10B – Non-food items are provided to ensure sufficient basic and domestic items',
      indicator: '# of people receiving hygiene packs/kits',
      definition: baseFilter(['Hygiene kit'])
    },
    {
      output: 'Output 10B – Non-food items are provided to ensure sufficient basic and domestic items',
      indicator: '# of people receiving other items (clothes, shoes, etc.)',
      definition: baseFilter(['Clothes', 'Shoes'])
    },
    {
      output: 'Output 10B – Non-food items are provided to ensure sufficient basic and domestic items',
      indicator: '# of people who received non-food items',
      definition: anyFilter(false)
    },    
  ]
}


const getIndicators = async (q) => {

  const index = `${elastic.dbPrefix}_assistances`

  const body = {
    size: 0,
    aggs: {
      metadata: {
        multi_terms: {
          terms: [
            { field: 'organization.name' },
            { field: 'address.pCode4' }
          ],
        },
        aggs: {
          standardNFI: definitions.nfi[0].definition
        }
      }
    }
  }
  const result = await client.search({ index, body })
  console.log(result.hits)
  return {}
}
 
module.exports = getIndicators
