//User.js

const mongoose = require('mongoose');  
const UserSchema = new mongoose.Schema({ 
  _id: mongoose.Schema.Types.ObjectId, 
  username: String,
  email: String,
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');