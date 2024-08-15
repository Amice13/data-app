module.exports = {
  docIsPublic: true,
  methods: {
    get: {
      isProtectedRoute: true,
      checkAuthorizationToken: true,
      checkAuthorizationAudience: true
      // isProtectedRoute: true,
      // checkAuthorizationToken: true,
      // checkAccessToken: true,
      // checkAuthorizationAudience: true,
      // checkAccessAudience: true,
      // allowedRoles: ['admin'],
      // allowedScopes: []
    }
  },
  rowLevelSecurity: {

  }
}