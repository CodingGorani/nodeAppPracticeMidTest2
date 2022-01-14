var express = require('express');
var app = express();
var router = express.Router();

const main = require('./main');
const form = require('./form');
const login = require('./login');
const logout = require('./logout');
const join = require('./join');

router.use('/', main);
router.use('/main', main);
router.use('/form', form);
router.use('/login', login);
router.use('/logout', logout);
router.use('/join', join);

module.exports = router;
