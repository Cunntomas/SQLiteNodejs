'use strict';
const express = require('express');
const router = express.Router();
const logger = require('../logger');
const SQLiteHelper = require('../utils/SQLite-helper');
const moment = require('moment');

function validateDateFormat(date) {
    let isValid = moment(date, 'DD-MM-YYYY').isValid();
    return isValid;
}

router.post('/', (req,res) => {
    let user = req.body;
    if(!user.name || !user.lastName || !user.birthday || !user.dni) {
      return res.status(400).json({
          error: 'missing_fields',
          message: 'fields name, lastName, birthday and dni are required'
      })
    }
    if(!validateDateFormat(req.body.birthday)) {
      return res.status(400).json({
        error: 'birthday_wrong_format',
        message: 'birthday format must be DD/MM/YYYY'
      })
    }
    return SQLiteHelper.insertOne([user.name, user.lastName, user.birthday, user.dni])
        .then(() => {
            res.json({
              message: 'user created succesfully'
            });
        })
        .catch((error) => {
            logger.error(error);
            res.status(500).json({
                error: 'internal_error',
                message: 'an internal error has ocurred'
            })
        });
});

router.get('/', (req,res) => {
  let query = req.query;
  if(query) {
    return SQLiteHelper.getFilteredUsers()
    .then((data) => {
      return res.json({data})
    })
  }
  return SQLiteHelper.getAll()
  .then((data) => {
    return res.json({data})
  })
});

router.get('/:id', (req,res) => {
  let id = req.params.id;
  return SQLiteHelper.getUserById(id)
    .then((data) => {
      return res.json({data})
  })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let params = req.body;
    return SQLiteHelper.updateUser(id, params)
        .then(() => {
          return res.json({
            message: 'user updated succesfully'
          });
        })
        .catch((error) => {
            logger.error(error);
            return res.status(500).json({
                error: 'internal_error',
                message: 'an internal error has ocurred'
            })
        });

});


router.delete('/:id', (req,res) => {
    let id = req.params.id;
    return SQLiteHelper.deleteUser(id)
        .then(() => {
          return res.json({
            message: 'user removed succesfully'
          });
        })
        .catch((error) => {
            logger.error(error);
            return res.status(500).json({
                error: 'internal_error',
                message: 'an internal error has ocurred'
            })
        });
});

module.exports = router;
