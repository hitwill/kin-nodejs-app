
const jwt = require('jsonwebtoken');

if(process.env.NODE_ENV === 'test'){
  require('dotenv').config();
}

function verifyToken(req, res, next) {

  console.log('loc verifyToken')

  const token = req.headers['x-access-token'];
  
  if (!token){
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, function(err, user) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything good, save to request for use in other routes
    req.userId = user.id;
    next();
  });

}

module.exports = verifyToken;