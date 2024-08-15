module.exports = {
  '/': {
    get: {
      summary: 'Verifies the user by the one time password',
      operationId: 'auth/totp-verify',
      responses: {
        '200': {
          description: 'Response',
          content: {
            'application/json': {
              schema: {
              }
            }
          }
        },
        '403': {
          description: 'The user does not exist or the password is incorrect',
          content: {
            'application/json': {
              schema: {
              }
            }
          }
        }
      },
      tags: ['Users', 'Authentication']
    }
  }
}
