module.exports = {
  '/': {
    get: {
      summary: 'Authenticates the user by login and password',
      operationId: 'auth/login',
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
