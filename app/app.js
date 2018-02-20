//app.js

var express = require('express');
var app = express();
var ejs = require('ejs');
var db = require('./db');

var AuthController = require('./routes/UserController');
app.use('/api/user', AuthController);

var AuthController = require('./routes/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;