const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../schemas/User');
const VerifyToken = require('../VerifyToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

if(process.env.NODE_ENV === 'test'){
  require('dotenv').config();
}

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// TOKEN VERIFICATION
router.get('/verify', VerifyToken, async function(req, res, next) {

  try{
    const user = await   User.findById(req.userId)
      .select("-password")
      .exec();
    if (!user) return res.status(404).send("No user found.");
    res.status(200).json(user);
  } catch(err){
    res.status(500).json({error: err});
  }

});

// USERNAME & PASSWORD VERIFICATION
router.get('/login', async function (req, res) {

  try{
    const user = await User.findOne({ 'email': req.body.email })
      .exec();
    if (!user) return res.status(404).send("No user found.");

    if(bcrypt.compareSync(req.body.password, user.password)){
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        return res.status(200).json({ auth: true, token: token });
    }
    else{
        return res.status(403).json({error: 'Incorrect login credentials.'});
    }
  } catch(err) {
    res.status(500).json({error: err});
  }

});

module.exports = router;