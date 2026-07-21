import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API de Contactos para la materia CSE 341',
  },
  host: 'https://cse341-contacts-ariane.onrender.com', 
  schemes: ['https', 'http'],
};

const outputFile = './swagger-output.json';
const routesEndpointsFiles = ['./routes/index.js']; 

swaggerAutogen()(outputFile, routesEndpointsFiles, doc);
