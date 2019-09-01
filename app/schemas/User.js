const mongoose = require('mongoose');
const Transaction = require('./Transaction').schema;

const UserSchema = new mongoose.Schema({ 
  _id: mongoose.Schema.Types.ObjectId, 
  email: {
  	type: String,
  	required: true
  },
  // password: {
  // 	type: String,
  // 	required: true
  // },
  // publicAddress: {
  // 	type: String,
  // 	required: true
  // },
  transactions: [Transaction]
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');