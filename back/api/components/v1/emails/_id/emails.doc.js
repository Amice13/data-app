module.exports = {
  '/': {
    get: {
      summary: 'Change the status of email in the database to "Read"',
      operationId: 'EmailTracker',
      parameters: [{
        in: 'path',
        name: '_id',
        schema: { type: 'string' },
        required: true,
        description: 'Email id'
      }],
      responses: {
        '200': {
          description: 'Returns a transparent 1x1 pixel PNG',
          content: {
            'image/png': {
              schema: {
                type: 'string',
                format: 'binary'
              }              
            }
          }
        },
        '404': {
          description: 'This email is not found'
        }
      },
      tags: ['Email']
    }
  }
}
