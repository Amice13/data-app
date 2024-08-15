module.exports = {
  docIsPublic: true,
  methods: {
    get: {
      isProtectedRoute: true,
      checkAuthorizationToken: true,
      checkAuthorizationAudience: true
    }
  }
}