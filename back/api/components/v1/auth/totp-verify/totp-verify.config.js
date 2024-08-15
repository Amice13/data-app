module.exports = {
  docIsPublic: true,
  methods: {
    post: {
      isProtectedRoute: true,
      checkAuthorizationToken: true,
      checkAuthorizationAudience: true
    }
  }
}