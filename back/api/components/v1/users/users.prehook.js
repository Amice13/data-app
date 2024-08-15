const trimAll = obj => {
  Object.keys(obj).forEach(k => obj[k] = typeof obj[k] == 'string' ? obj[k].trim() : obj[k])  
  return obj
}

const processBody = (body) => {
  body = trimAll(body)
  body.person = trimAll(body.person) 
  if (body.person?.phone) body.person.phone = trimAll(body.person.phone)
  if (body.person?.website) body.person.website = trimAll(body.person.website)
  if (body.person?.email) body.person.email = trimAll(body.person.email)
  let person = body.person
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
  return body
}

module.exports = {
  processBody
}
