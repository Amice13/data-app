const controller = (req, res, next) => {
  res.status(200)
  res.json(req.body)
  next()
}

module.exports = controller