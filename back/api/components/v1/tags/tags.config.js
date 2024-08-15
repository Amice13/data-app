module.exports = {
  docIsPublic: true,
  methods: {
    post: {
      isProtectedRoute: true,
      checkAccessToken: true,
      checkAccessAudience: true
    }
  }
}
