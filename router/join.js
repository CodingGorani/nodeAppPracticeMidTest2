var express = require('express');
app = express();
router = express.Router();
mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

router.get('/', (req, res) => {
  res.render('join.ejs');
});

router.post('/', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  connection.query(
    'SELECT * FROM user WHERE username = ?',
    username,
    (err, results) => {
      if (err) throw err;
      if (results.length !== 0) {
        res.json({ message: 'You already joined' });
        console.log([username, password]);
      } else {
        connection.query(
          'INSERT INTO user (username, password) VALUES (?, ?)',
          [username, password],
          (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
              res.json({ message: 'Wrong Username Or Password' });
            } else {
              res.redirect('/');
            }
          }
        );
      }
    }
  );
  // res.status(200).json({ message: 'ok' });
});
module.exports = router;
