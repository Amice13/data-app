module.exports = {
  docIsPublic: false,
  methods: {
    get: {
      isProtectedRoute: true,
      checkAccessToken: true,
      checkAccessAudience: true,
      allowedRoles: ['Admin']
    }
  }
}