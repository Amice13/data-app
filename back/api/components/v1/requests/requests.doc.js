module.exports = {
  '/': {
    get: {
      summary: "GET /ops/features",
      operationId: "ListFeatures",
      security: {'Bearer': ['admin']},
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {

            }
          }
        }
      },
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
        '401': {
          description: 'You are not authorized'
        },
        '403': {
          description: 'You are not allowed to make this reuqest'
        },
        '404': {
          description: 'This entity does not exist'
        }
      },
      parameters: [
        {
          in: 'header',
          name: 'X-Request-ID',
          description: '',
          required: true,
          type: 'string',
          format: 'string'
        },
        {
          in: 'path',
          name: 'uuid',
          description: '',
          required: true,
          type: 'string',
          format: 'string'
        },
        {
          in: 'body',
          name: 'body',
          description: '',
          required: true,
          schema: {
          }
        },
        {
          in: 'query',
          name: 'body',
          description: '',
          required: true,
          schema: {
          }
        }
      ],
      tags: ['Generic']
    }
  }
}
