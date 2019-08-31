const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../schemas/User');
const VerifyToken = require('../VerifyToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); 

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); 

// Registers a new user
router.post('/', function(req, res, next) {

  console.log('loc api/user/');

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  user
    .save()
    .then(result => {
    // // create a token
    // let token = jwt.sign({ id: user._id }, config.secret, {
    //   expiresIn: 86400 // expires in 24 hours
    // });
    return res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).json({error: err});
    });

});

// Returns all users from the database
router.get('/', function (req, res) {

    User
      .find()
      .select("-password")
      .exec()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({error: err});
      });

});

// Returns a single user from the database
router.get('/:id', function (req, res) {

    User
      .findById(req.params.id)
      .select("-password")
      .exec()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({error: err});
      });

});

// Deletes a single user from the database
router.delete('/:id', function (req, res) {

    User
      .findByIdAndRemove('')
      .exec()
      .then(user => {
        res.status(200).json(user.username + ' deleted');
      })
      .catch(err => {
        res.status(500).json({error: err});
      });

});

// Updates a single user in the database
router.put('/:id', function (req, res) {

    //Incomplete

    User
      .findByIdAndUpdate('')
      .exec()
      .then(user => {
        res.status(200).json('user deleted');
      })
      .catch(err => {
        res.status(500).json({error: err});
      });

});


module.exports = router;