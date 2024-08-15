const { v4: uuidv4 } = require('uuid')

const trimAll = obj => {
  Object.keys(obj).forEach(k => obj[k] = typeof obj[k] == 'string' ? obj[k].trim() : obj[k])  
  return obj
}

const genders = {
  'Transgender': 'Transgender',
  'Non-conforming/Non-variant': 'NonConforming',
  'Other': 'Other',
  'Do not want to disclose': 'NotDisclosed'
}

// Custom functions
const getGroup = (person) => {
  if (person.gender === 'Female' && parseInt(person.age) < 18) return 'girls'
  if (person.gender === 'Female' && parseInt(person.age) < 60) return 'women'
  if (person.gender === 'Female') return 'seniorWomen'
  if (person.gender === 'Male' && parseInt(person.age) < 18) return 'boys'
  if (person.gender === 'Male' && parseInt(person.age) < 60) return 'men'
  if (person.gender === 'Male') return 'seniorMen'
  const age = parseInt(person.age) < 18 ? 'children' : (parseInt(person.age) < 60) ? 'adults' : 'seniors'
  const gender = genders[person.gender]
  if (!age || !gender) return 'adultsOther'
  return age + gender
}

const countFamilyStats = model => {
  let familyMembers = model.familyMembers ? JSON.parse(JSON.stringify(model.familyMembers)) : []
  familyMembers.push(model.headOfHousehold)
  const disabled = familyMembers.filter(el => el.vulnerability?.name === 'Disability')
  const vulnerable = familyMembers.filter(el => el.vulnerability?.name && el.vulnerability.name !== 'N/A')
  const familyStats = familyMembers.reduce((groups, person) => {
    let groupName = getGroup(person)
    if (!groups[groupName]) groups[groupName] = 0
    groups[groupName] = groups[groupName] + 1
    return groups
  }, {})
  familyStats.all = familyMembers.length
  familyStats.disabled = disabled.length
  return familyStats
}

const getAgeGroup = (age) => {
  if (typeof age !== 'number') return false
  if (age < 18) return 'children'
  if (age < 60) return 'adult'
  return 'senior'
}

const calculateAge = (birthday) => {
  const currentDay = new Date().toLocaleDateString('sv-SE')
  const currentDate = new Date(currentDay)
  const birthdayDate = new Date(birthday)
  const difference = currentDate - birthdayDate
  const ageDate = new Date(difference)
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)
  return age
}

const createFamilyMembersIds = (body) => {
  const noTaxId = !body.headOfHousehold?.taxId || body.headOfHousehold?.taxId === '0000000000' 
  const taxId = noTaxId ? uuidv4() : body.headOfHousehold.taxId
  const hhId = [
    body.headOfHousehold?.gender || 'NA',
    getAgeGroup(body.headOfHousehold?.age) || 'NA',
    body.householdId || 'NA',
    body.headOfHousehold?.birthday || 'NA',
    taxId || 'NA'
  ].join(';')
  const familyMembersIds = body.familyMembers.map(el => {
    const noTaxId = !el.taxId || el.taxId === '0000000000' 
    const taxId = noTaxId ? uuidv4() : el.taxId
    return [
      el.gender || 'NA',
      getAgeGroup(el.age) || 'NA',
      body.householdId || 'NA',
      el.birthday || 'NA',
      taxId || 'NA'
    ].join(';')
  })
  return [hhId, ...familyMembersIds]
}

const processBody = (body) => {
  // Clean unnecessary spaces
  body = trimAll(body)
  if (body.collectiveCenter) body.collectiveCenter = trimAll(body.collectiveCenter)
  if (body.tags) body.tags = body.tags.map(el => el.trim())
  if (body.headOfHousehold) body.headOfHousehold = trimAll(body.headOfHousehold)

  // Add fullname for the person
  let person = body.headOfHousehold
  person.fullName = [person.familyName, person.givenName, person.additionalName].filter(Boolean).join(' ')
  if (person.translation) {
    for (let i18n of Object.keys(person.translation)) {
      person.translation[i18n] = trimAll(person.translation[i18n])
      let translation = person.translation[i18n]
      translation.fullName = [
        translation.familyName,
        translation.givenName,
        translation.additionalName
      ].filter(Boolean).join(' ')
    }
  }

  // Find the family members age
  body.familyMembers = body.familyMembers.map(el => {
    if (el.birthday) el.age = calculateAge(el.birthday)
    if (el.age) el.age = parseInt(el.age)
    return el
  })

  // Count family stats
  body.familyStats = countFamilyStats(body)

  if (body.household) {
    body.household.householdId = body.householdId
    body.household.type = 'Household'
  }

  // Create unique ID for family members
  body.familyMembersIds = createFamilyMembersIds(body)
  return body
}

module.exports = {
  processBody
}
