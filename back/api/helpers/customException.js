const CustomException = (code, message) => {
  const error = new Error(message)
  error.code = code
  return error
}

module.exports = {
  CustomException
}