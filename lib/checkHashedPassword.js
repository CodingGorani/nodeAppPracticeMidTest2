var mysql = require('mysql');
var crypto = require('crypto');
var connection = require('./connection');

const checkHashedPassword = (salt, plainPassword) =>
  new Promise((resolve, reject) => {
    console.log('솔트를확인해보자', salt);
    crypto.pbkdf2(plainPassword, salt, 8999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve(key.toString('base64'));
    });
  });

module.exports = checkHashedPassword;
