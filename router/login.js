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
  res.render('login.ejs');
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  connection.query(
    'SELECT * FROM user WHERE username=? AND password=?',
    [username, password],
    (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
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
});
module.exports = router;
