module.exports = {
  docIsPublic: true,
  methods: {
    put: {
      isProtectedRoute: true,
      checkAccessToken: true,
      checkAccessAudience: true,
      allowedRoles: ['Admin']
    },
    post: {
      isProtectedRoute: true,
      checkAccessToken: true,
      checkAccessAudience: true,
      allowedRoles: ['Admin']
    }
  }
}
