var express = require('express');
createHashedPassword = require('../lib/createHashedPassword');
app = express();
router = express.Router();
mysql = require('mysql');
crypto = require('crypto');
connection = require('../lib/connection');

router.get('/', (req, res) => {
  res.render('join.ejs');
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  connection.query(
    'SELECT * FROM user WHERE username = ?',
    username,
    async (err, results) => {
      if (err) throw err;
      if (results.length !== 0) {
        res.json({ message: 'You already joined' });
        console.log([username, password]);
      } else {
        const { hashedPassword, salt } = await createHashedPassword(password);
        connection.query(
          'INSERT INTO user (username, password, salt) VALUES (?, ?, ?)',
          [username, hashedPassword, salt],
          (err, results) => {
            if (err) throw err;
            else res.redirect('/');
          }
        );
      }
    }
  );
  // res.status(200).json({ message: 'ok' });
});
module.exports = router;
