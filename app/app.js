const express = require('express');
const app = express();
const db = require('./db');
const ejs = require('ejs');
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
	console.log("/");
	return res.send('Kin Node.js App - A backend server using the Kin SDK for Node.js including database, user management and authorization.');
});

const AuthController = require('./routes/AuthController');
app.use('/api/auth', AuthController);

const UserController = require('./routes/UserController');
app.use('/api/user', UserController);

const KinController = require('./routes/KinController');
app.use('/api/kin', KinController);

module.exports = app;