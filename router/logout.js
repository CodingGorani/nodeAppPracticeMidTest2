var express = require('express');
app = express();
router = express.Router();
mysql = require('mysql');
connection = require('../lib/connection');

router.get('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    else res.json({ message: 'logouted' });
  });
});

module.exports = router;
