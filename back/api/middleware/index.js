module.exports = {
  accessLogger: require('./accessLogger'),
  methodCheck: require('./methodCheck'),
  auth: require('./auth'),
  blacklist: require('./blacklist'),
  validator: require('./validator'),
  prehook: require('./prehook'),
  posthook: require('./posthook'),
  jsend: require('./jsend'),
  errorHandler: require('./errorHandler'),
  custom404: require('./custom404')
}
