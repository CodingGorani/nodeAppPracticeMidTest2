var express = require('express');
app = express();
router = express.Router();
mysql = require('mysql');
connection = require('../lib/connection');

router.get('/', (req, res) => {
  res.render('form.ejs');
});

router.post('/', (req, res) => {
  console.log('you are here');
  console.log(req.body);
  res.status(200).json({ message: 'hi' });
});

module.exports = router;
