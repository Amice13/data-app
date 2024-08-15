module.exports = (req, res, next) => {
  if (res.headersSent) return next()
  return res.status(404).json({
    status: 'error',
    data: { errors: [{ message:  'The Web site you seek\nCannot be located, but\nCountless more exist.' }] }
  })
}
