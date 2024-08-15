module.exports = {
  '/': {
    get: {
      summary: 'Creates the admin user if none exists',
      operationId: 'auth/intialize',
      responses: {
        '200': {
          description: 'Response',
          content: {
            'application/json': {
              schema: {
                password: {
                  type: 'string'
                }
              }
            }
          }
        },
        '403': {
          description: 'The admin user already exists',
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
