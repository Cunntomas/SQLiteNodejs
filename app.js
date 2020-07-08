'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./lib/logger');
const expressWinston = require('express-winston');
const app = express();
const routes = require('./lib/routes');
const models = require('./lib/models');
const {getDB} = require('./database/db');

function initialize() {
      app.use(bodyParser.json());
      app.use(expressWinston.logger({
          winstonInstance: logger,
          expressFormat: true,
          colorize: false,
          meta: false,
          statusLevels: true
      }));

      Object.keys(routes).forEach((key) => {
          app.use(`/api/${key}`, routes[key]);
      });

      let db = getDB();
      Object.keys(models).map((key) => {
        db.run(models[key]);
      })


      app.use(function(req, res, next) {
          let err = new Error('Not Found');
          err.status = 404;
          next(err);
      });

      app.use(function(err, req, res, next) {
          logger.error('handleError: ', err);
          if (res.headersSent) {
              return next(err);
          }
          let error = {};
          error.status = err.status;
          if (req.app.get('env') === 'development') {
              error.message = err.message;
              error.stack = err.stack;
          }
          return res.status(err.status || 500).json({
              error
          });
      });

      return app;
}

module.exports = {
    initialize
}
