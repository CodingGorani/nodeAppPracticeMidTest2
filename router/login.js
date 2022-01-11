var express = require('express');
app = express();
router = express.Router();
mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

router.get('/', (req, res) => {
  res.render('login.ejs');
});

router.post('/', (req, res) => {
  res.status(200).json({ message: 'ok' });
});
module.exports = router;
