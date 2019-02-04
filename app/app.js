var express = require('express');
var app = express();
var db = require('./db');
const ejs = require('ejs');
const path = require('path')
var VerifyToken = require('./VerifyToken');

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
	
	console.log("/");

	return res.render('../views/pages/index');

});

const UserController = require('./routes/UserController');
app.use('/api/user', UserController);

const AuthController = require('./routes/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;