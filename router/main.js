var express = require('express');
app = express();
router = express.Router();
mysql = require('mysql');
connection = require('../lib/connection');

router.get('/', (req, res) => {
  res.render('main.ejs', { isLogined: req.session.isLogined });
});

module.exports = router;
