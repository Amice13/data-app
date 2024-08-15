module.exports = {
  '/': {
    get: {
      summary: 'Set a new password for the authenticated user and grants access to the system',
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
          description: 'The user is not authorized to change password',
          content: {
            'application/json': {
              schema: {
              }
            }
          }
        },
        '500': {
          description: 'The password or password confirmation is not correct',
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
