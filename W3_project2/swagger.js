import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Books and Authors API with OAuth',
    description: 'API for managing books and authors protected by GitHub OAuth',
  },
  host: 'project2-3c1l.onrender.com', 
  schemes: ['https'],
  securityDefinitions: {
    oauth2: {
      type: 'oauth2',
      authorizationUrl: '/auth/login',
      flow: 'implicit',
      scopes: {
        'user:email': 'Access user email profile'
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routesEndpointsFiles = ['./routes/index.js'];

swaggerAutogen()(outputFile, routesEndpointsFiles, doc);
