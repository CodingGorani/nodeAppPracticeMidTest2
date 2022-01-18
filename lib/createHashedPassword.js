var cryto = require('crypto');

const makeSalt = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  });

const createHashedPassword = (plainPassword) =>
  new Promise(async (resolve, reject) => {
    const salt = await makeSalt();
    crypto.pbkdf2(plainPassword, salt, 8999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve({ hashedPassword: key.toString('base64'), salt });
    });
  });

module.exports = createHashedPassword;
