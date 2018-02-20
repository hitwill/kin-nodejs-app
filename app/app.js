//app.js

var express = require('express');
var app = express();
var db = require('./db');

var AuthController = require('./routes/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;