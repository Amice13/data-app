const addAssistance = require('./services/addAssistance')
const updateAssistance = require('./services/updateAssistance')

const controller = async (req, res, next) => {
  try {
    if (req.method === 'POST') {
      req.body.createdBy = req.user.sub
      req.body.createdAt = new Date()
      let result = await addAssistance(req.body)
      res.status(200).json(result)
      return res
    }
    if (req.method === 'PUT') {
      req.body.updatedBy = req.user.sub
      req.body.updatedAt = new Date()
      let result = await updateAssistance(req.body)
      res.status(201).json(result)
      return res
    }
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
