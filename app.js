var express = require('express');
app = express();
router = express.Router();
mysql = require('mysql');

const form = require('./router/form.js');
const login = require('./router/login.js');
const join = require('./router/join.js');

require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.listen(3030, (err) => {
  if (err) throw err;
  console.log('This app is listening on http://localhost:3030');
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use('/form', form);
app.use('/login', login);
app.use('/join', join);
