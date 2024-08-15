module.exports = {
  docIsPublic: true,
  methods: {
    get: {
      isProtectedRoute: true,
      checkAccessToken: true
    }
  }
}