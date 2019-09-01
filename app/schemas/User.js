//User.js

const mongoose = require('mongoose');  
const UserSchema = new mongoose.Schema({ 
  _id: mongoose.Schema.Types.ObjectId, 
  email: String,
  password: String,
  publicAddress: String,
  transactions: [{
  	txId: String,
  	type: String,
  	sentTo: String,
  	receivedFrom: String,
  	amount: Number,
  	note: String
  }]
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');