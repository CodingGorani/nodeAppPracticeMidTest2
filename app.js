var express = require('express');
var app = express();
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

const router = require('./router/index.js');
require('dotenv').config();

const sessdbOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.SS_DB_NAME,
};

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

var sessionStore = new MySQLStore(sessdbOptions);

var sess = {
  key: process.env.SS_COOKIE_KEY,
  secret: process.env.SS_COOKIE_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 },
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.listen(3030, (err) => {
  if (err) throw err;
  console.log('This app is listening on http://localhost:3030');
});

app.use('/', router);
