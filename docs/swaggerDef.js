const { version } = require('../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Backend Boilerplate',
    version,
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v0`,
    },
  ],
};

module.exports = swaggerDef;
