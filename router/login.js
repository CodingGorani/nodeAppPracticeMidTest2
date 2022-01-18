var express = require('express');
checkHashedPassword = require('../lib/checkHashedPassword');
app = express();
router = express.Router();
mysql = require('mysql');
connection = require('../lib/connection');

router.get('/', (req, res) => {
  res.render('login.ejs');
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const salt = connection.query(
    'SELECT * FROM user WHERE username = ?',
    [username],
    async (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        res.json({ message: 'Wrong username or password' });
      } else {
        const hashedPassword = await checkHashedPassword(
          results[0].salt,
          password
        );
        connection.query(
          'SELECT * FROM user WHERE username = ? AND password = ?',
          [username, hashedPassword],
          (err, results) => {
            if (err) {
              throw err;
            } else if (!results) {
              res.json({ message: 'Wrong username or password' });
            } else {
              req.session.uid = results[0]._id;
              req.session.isLogined = true;
              req.session.save(() => {
                res.redirect('/');
              });
            }
          }
        );
      }
    }
  );
});
module.exports = router;
