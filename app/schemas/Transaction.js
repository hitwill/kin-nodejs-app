const mongoose = require('mongoose');

const TransactionSchema =mongoose.Schema({
	txId: {
		type: String,
		required: true
	},
	txDirection: {
		type: String,
		required: true
	},
	toFromPublicAddress: {
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
	}
});

mongoose.model('Transaction', TransactionSchema);
module.exports = mongoose.model('Transaction');