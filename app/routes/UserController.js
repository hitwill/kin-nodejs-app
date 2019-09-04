const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../schemas/User');
const Transaction = require('../schemas/Transaction');
const VerifyToken = require('../VerifyToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); 

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); 

// Registers a new user
router.post('/register', async function(req, res, next) {
  
  const hashedPassword = await bcrypt.hashSync(req.body.password, 8);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hashedPassword,
    publicAddress: req.body.publicAddress
  });

  try{
    const result = await user.save()
    res.status(200).send(result);
  } catch(err) {
    res.status(500).json({error: err});
  }

});

// Returns all users from the database
router.get('/', async function (req, res) {
  try{
    const users = await User
      .find()
      .select("-password")
      .exec()

      res.status(200).json(users);
    } catch(err){
      console.log(err);
      res.status(500).json({error: err});
    }
});

// Returns a single user from the database
router.get('/:id', async function (req, res) {
  try{
    const user = await User
      .findById(req.params.id)
      .select("-password")
      .exec()
    res.status(200).json(user);
    } catch (err){
      res.status(500).json({error: err});
    }
});

// Deletes a single user from the database
router.delete('/:id', function (req, res) {
    User.findById(req.params.id)
    .exec()
    .then(user =>{
      const email = user.email;
      user.delete()
      .then(user => {
        res.status(200).json(user.email + ' has been deleted');
      });
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
});

// Updates a single user in the database
router.put('/:id', function (req, res) {
    User
      .findById(req.params.id)
      .exec()
      .then(user => {
        user.email = req.body.email;
        user.save()
        .then(user =>{
          res.status(200).json('email has been updated to ' + user.email);
        });
      })
      .catch(err => {
        res.status(500).json({error: err});
      });
});

module.exports = router;