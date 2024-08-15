const trimAll = obj => {
  Object.keys(obj).forEach(k => obj[k] = typeof obj[k] == 'string' ? obj[k].trim() : obj[k])  
  return obj
}

const processBody = (body) => {
  body = trimAll(body)
  if (body.collectiveCenter) {
    body.collectiveCenter = trimAll(body.collectiveCenter)
  }
  body.date = body.date || new Date()
  const tzOffset = new Date().getTimezoneOffset() * 60000
  const date = new Date(new Date(body.date).getTime() - tzOffset).toISOString().substring(0, 10)
  const publicId = [
    body.bundleName,
    body.organization?.name,
    body.address?.pCode4,
    body.populationType,
    date
  ].filter(Boolean).join('-')
  body.publicId = publicId
  if (body.tags) body.tags = body.tags.map(el => el.trim())
  return body
}

module.exports = {
  processBody
}
