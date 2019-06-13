//User.js

let mongoose = require('mongoose');  
let UserSchema = new mongoose.Schema({ 
  _id: mongoose.Schema.Types.ObjectId, 
  username: String,
  email: String,
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');