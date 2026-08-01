import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Books and Authors API',
    description: 'API for managing books and authors - Project 2 Part 1',
  },
  host: 'localhost:8080',
  schemes: ['https', 'http'],
};

const outputFile = './swagger-output.json';
const routesEndpointsFiles = ['./routes/index.js'];

swaggerAutogen()(outputFile, routesEndpointsFiles, doc);
