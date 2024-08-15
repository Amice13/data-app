module.exports = {
  '/': {
    get: {
      summary: 'Provides a refresh token for the user',
      operationId: 'auth/refresh',
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
