const addRequest = require('./services/addRequest')
const updateRequest = require('./services/updateRequest')

const controller = async (req, res, next) => {
  try {
    if (req.method === 'PUT') {
      req.body.updatedBy = req.user.sub
      req.body.updatedAt = new Date()
      let result = await updateRequest(req.body)
      res.status(201).json(result)
      return res
    }
    if (req.method === 'POST') {
      req.body.createdBy = req.user.sub
      req.body.createdAt = new Date()
      let result = await addRequest(req.body)
      res.status(200).json(result)
      return res
    }
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
