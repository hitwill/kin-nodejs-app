// AuthController.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../schemas/User');
const VerifyToken = require('../VerifyToken');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// TOKEN VERIFICATION
router.get('/verify', VerifyToken, function(req, res, next) {

  console.log('loc get api/auth/verify');

  //VerifyToken is called first
  
	User.findById(req.userId, {password: 0},
  	function (err, user) {
    	if (err) return res.status(500).send("There was a problem finding the user.");
    	if (!user) return res.status(404).send("No user found.");
    
    	res.status(200).send(user);
  });

});

// USERNAME & PASSWORD VERIFICATION
router.get('/login', function (req, res) {

  console.log('loc get api/auth/login');

  console.log(req.query.username);
  console.log(req.query.password);

  User.findOne({ 'username': req.query.username }, function (err, user) {
    if (err) return res.status(500).send({ auth: false, message: 'There was an error retrieving your user.' });

    if (user == null) {
       return res.status(403).send('User not found');
    }

    if(bcrypt.compareSync(req.query.password, user.password)){
        // create a token
        let token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        console.log(user.username + ' has logged in');

        return res.status(200).send({ auth: true, token: token });

    }
    else{
        return res.status(403);
    }
  });
});

module.exports = router;