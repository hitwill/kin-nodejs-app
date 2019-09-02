const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
	txId: {
		type: String,
		required: true
	},
	status:{
		type: String,
		required: true
	},
	toAddress: {
		type: String,
		required: true
	},
	fromAddress:{
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	note: {
		type: String,
		required: true
	},
	createdAt: {
	  	type: Date, 
	  	default: Date.now,
	  	required: true
  	},
	  	updatedAt: {
	  	type:  Date,
	  	default: Date.now,
	  	required: true
  	}
});

mongoose.model('Transaction', TransactionSchema);
module.exports = mongoose.model('Transaction');