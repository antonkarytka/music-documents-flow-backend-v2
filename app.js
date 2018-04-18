const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');

const router = require('./routes');

const app = express();


app.use(logger('dev'));
app.use(logger('common', {
  stream: fs.createWriteStream('api.log', {flags: 'a'})
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

app.use(router);


module.exports = app;
