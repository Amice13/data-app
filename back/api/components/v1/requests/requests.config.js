module.exports = {
  docIsPublic: true,
  methods: {
    get: {
      isProtectedRoute: true,
      checkAccessToken: true,
      checkAccessAudience: true
    },
    put: {
      isProtectedRoute: true,
      checkAccessToken: true,
      checkAccessAudience: true
    },
    post: {
      isProtectedRoute: true,
      checkAccessToken: true,
      checkAccessAudience: true,
      allowedRoles: ['Admin']
    }
  },
  rowLevelSecurity: {

  }
}