// AuthController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('../schemas/User');
var VerifyToken = require('../VerifyToken');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// TOKEN VERIFICATION
router.get('/verify', VerifyToken, function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
	User.findById(decoded.id, {password: 0},
  	function (err, user) {
    	if (err) return res.status(500).send("There was a problem finding the user.");
    	if (!user) return res.status(404).send("No user found.");
    
    	res.status(200).send(user);

  	});
  });
});

// USERNAME & PASSWORD VERIFICATION
router.get('/login/:username/:password', function (req, res) {

  User.findOne({ 'email': req.params.username }, function (err, user) {
    if (err) return res.status(500).send({ auth: false, message: 'There was an error retrieving your user.' });

    if(bcrypt.compareSync(req.params.password, user.password)){
        res.status(200).send(user);
    }
    else{
        res.status(200).send('wrong password');
    }
  });

});

module.exports = router;