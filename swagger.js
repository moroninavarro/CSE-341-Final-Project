const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Final Project API',
    description: 'This is our API as a Team'
  },
  host: 'cse-341-final-project-9ijo.onrender.com',
  schemes: ['https'],
  basePath: "/",
  consumes: ["application/json"],
  produces: ["application/json"],

  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "connect.sid"
      }
    }
  },
  security: [
    {
      cookieAuth: []
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });