'use strict';
require('dotenv').config();
const app = require('./app');
const logger = require('./lib/logger');
const {initSQlite, disconnect} = require('./database/db');
const PORT = process.env.PORT || 3000;

return initSQlite()
    .then(() => {
      const application = app.initialize();
      application.listen(PORT);
      logger.info(`Your server is listening on port ${PORT}`);
    })
    .catch((err) => {
        logger.error('ERROR: ', err);
        return process.exit(1);
    });
