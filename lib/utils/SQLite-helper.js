'use strict';
const {getDB} = require('../../database/db');
const validUserParams = ['name', 'lastName', 'birthday', 'dni'];
const {
  GET_ALL,
  GET_FILTERED_USERS,
  GET_USER_BY_ID,
  INSERT_USER,
  DELETE_USER,
  UPDATE_USER
} = require('./queries.js');


function getAll() {
  return new Promise((resolve, reject) => {
      getDB().all(GET_ALL, (error, data) => {
          if(error) {
            return reject(error);
          }
          resolve(data);
      });
  });
}

function getFilteredUsers(params) {


  return new Promise((resolve, reject) => {
      getDB().all(GET_FILTERED_USERS, (error, data) => {
          if(error) {
            return reject(error);
          }
          resolve(data);
      });
  });
}

function getUserById(param) {
  return new Promise((resolve, reject) => {
      getDB().all(GET_USER_BY_ID, param, (error, data) => {
          if(error) {
            return reject(error);
          }
          resolve(data);
      });
  });
}

function insertOne(params) {
  return new Promise((resolve, reject) => {
      getDB().run(INSERT_USER, params, (error) => {
          if(error) {
            return reject(error);
          }
          resolve();
      });
  });
}

function deleteUser(param) {
  return new Promise((resolve, reject) => {
      getDB().run(DELETE_USER, param, (error) => {
          if(error) {
            return reject(error);
          }
          resolve();
      });
  });
}

function updateUser(id, params) {
  let query = UPDATE_USER;
  let modification = '';
  let values = [];

  Object.keys(params).forEach((column) => {
      if(validUserParams.indexOf(column) >= 0) {
          modification += ` ${column} = ?,`;
          values.push(params[column]);
      }
  });

  modification = modification.substring(0, modification.length - 1);
  query = query.replace(new RegExp('{{modification}}', 'ig'), modification);
  values.push(id);
  return new Promise((resolve, reject) => {
      getDB().run(query, values, (error) => {
          if(error) {
            return reject(error);
          }
          resolve();
      });
  });
}

module.exports = {
    getAll,
    insertOne,
    deleteUser,
    updateUser,
    getUserById
}
