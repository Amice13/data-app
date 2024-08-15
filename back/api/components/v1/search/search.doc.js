module.exports = {
  '/': {
    post: {
      summary: 'Confirms the email of the user',
      operationId: 'auth/confirm',
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
          description: 'The confirmation code is invalid',
          content: {
            'application/json': {
              schema: {
              }
            }
          }
        }
      },
      tags: ['Users']
    }
  }
}
