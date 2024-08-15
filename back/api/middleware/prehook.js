const { prehooks, CustomException } = require('@api-helpers')

module.exports = async (req, res, next) => {
  if (!prehooks[req.key]) return next()
  const { processBody, processParams, processQuery } = prehooks[req.key]
  if (processBody) req.body = await processBody(req.body)
  if (processParams) req.params = await processParams(req.params)
  if (processQuery) req.query = await processQuery(req.query)
  return next()
}
