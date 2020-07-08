'use strict';
const sqlite3 = require('sqlite3');
const logger = require('../lib/logger');
const DB = process.env.DB;
let db;

async function initSQlite() {
  new Promise((resolve, reject) => {
      db = new sqlite3.Database(DB, (error) => {
        if(error) {
          logger.error('Error connecting to database', error);
          reject(error);
        } else {
          logger.info('Database initialized succesfully');
          resolve();
        }
      });
  });
}

function getDB() {
  return db;
}

function disconnect() {
  new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        return reject(err);
      }
      logger.info('Close the database connection.');
      resolve();
    });
  });
}

module.exports = {
  initSQlite,
  disconnect,
  getDB
}
