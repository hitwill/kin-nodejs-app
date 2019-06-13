//VerifyToken.js

let jwt = require('jsonwebtoken');
let config = require('./config');

function verifyToken(req, res, next) {

  console.log('loc verifyToken')

  let token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, user) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything good, save to request for use in other routes
    req.userId = user.id;
    next();
  });
}

module.exports = verifyToken;