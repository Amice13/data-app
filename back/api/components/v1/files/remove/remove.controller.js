const remove = require('./services/remove')

const controller = async (req, res, next) => {
  try {
    const { path } = req.body
    const { user }  = req
    const data = await remove({ path, user })
    return res.status(200).json(data)
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
