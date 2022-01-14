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
  req.session.destroy((err) => {
    if (err) throw err;
    else res.redirect('/main');
  });
});

module.exports = router;
