const posthook = (body) => {
  delete body.secret
  return body
}

module.exports = posthook
