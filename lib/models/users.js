'use strict';
const User = `CREATE TABLE IF NOT EXISTS Users (
        userId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name text,
        lastName text,
        birthday date NOT NULL,
        dni integer
    );`;

module.exports = User;
