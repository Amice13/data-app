const { Router } = require('express')
const router = Router({ mergeParams: true })

const { CustomException, controllers } = require('@api-helpers')

// Custom middleware
const {
  methodCheck,
  auth,
  blacklist,
  validator,
  prehook,
  posthook,
  errorHandler
} = require('@api-middleware')

// Controllers should be sorted by length to cover more specific paths
const currentControllers = Object.entries(controllers)
currentControllers.sort((a, b) => b[0].length - a[0].length)

// Define the routes for the app
for (let [key, controller] of currentControllers) {
  const path = key.replace(/(?<=\/)_/g, ':')
  // By default the router should catch the direct path and the path with the id param
  router.all(path,
    // Insert the path key
    (req, res, next) => {
      req.key = key
      next()
    },
    // Check the request by the route config
    methodCheck,
    // Check if the user must be authenticated
    auth,
    // Check if the user token is blacklisted
    blacklist,
    // Check if the request body, params and query are valid
    validator,
    // Enrich the body if necessary
    prehook,
    // Make any aditional actions if necessary
    posthook,
    // Execute the main logic
    controller,
    // Handle any error
    errorHandler
  )
}

module.exports = router
