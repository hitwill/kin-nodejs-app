const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../schemas/User');
const VerifyToken = require('../VerifyToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//require('dotenv').config();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// TOKEN VERIFICATION
router.get('/verify', VerifyToken, function(req, res, next) {

  //VerifyToken is called first

  console.log('loc get api/auth/verify');

  User.findById(req.userId)
    .select("-password")
    .exec()
    .then(user => {
      if (!user) return res.status(404).send("No user found.");
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });

});

// USERNAME & PASSWORD VERIFICATION
router.get('/login', function (req, res) {

  console.log('loc get api/auth/login');

  User.findOne({ 'username': req.query.username })
    .then(user => {
          if (!user){
            return res.status(403).send('User not found');
          }
          if(bcrypt.compareSync(req.query.password, user.password)){
              // create a token
              const token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
              });

              console.log(user.username + ' has logged in');

              return res.status(200).send({ auth: true, token: token });
          }
          else{
              return res.status(403).send('Incorrect login credentials.');
          }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;