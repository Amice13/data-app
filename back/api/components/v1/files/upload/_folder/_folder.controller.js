const upload = require('./services/upload')

const controller = async (req, res, next) => {
  try {
    const { folder } = req.params
    const { files, user }  = req
    const data = await upload({ files, folder, user })
    return res.status(200).json(data)
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
