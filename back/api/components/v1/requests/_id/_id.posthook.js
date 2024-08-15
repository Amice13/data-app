const posthook = (body) => {
  delete body.isSuperUser
  delete body.secret
  return body
}

module.exports = posthook
