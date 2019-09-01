const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const KinClient = require('@kinecosystem/kin-sdk-node').KinClient;
const Environment = require('@kinecosystem/kin-sdk-node').Environment;
const client = new KinClient(Environment.Testnet);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const account = client.createKinAccount({
            //seed: 'seed',
            appId: 'chas',
            //channelSecretKeys: ['channel_seed1', 'channel_seed2']
        });

router.get('/createaccount', function(req, res, next) {

  console.log('loc /createaccount');

  client.getMinimumFee()
        .then(minFee =>{
            //save minimum fee
        });

  account.buildCreateAccount({
          address: 'address',
          startingBalance: 10,
          fee: 100,
          memoText: 'my first account' //a text memo can also be added; memos cannot exceed 21 characters
      })
      .then(createAccountBuilder => {
          return account.submitTransaction(createAccountBuilder)
      })
      .then(transactionId => {
          console.log('transactionId');
      });

});

router.get('/pay', function(req, res, next) {

  client.getMinimumFee()
        .then(minFee =>{
            //save minimum fee
        });

   //Build the transaction locally
   account.buildSendKin({
        address: destination,
        amount: 20,
        fee: 100,
        memoText: 'tx memo'
    }).then(builder => {
        //Use the builder to submit the transaction to the blockchain
        builder => account.submitTransaction(builder)
    });

});

router.get('/whitelist', function(req, res, next) {

  const whitelistedTransaction = account.whitelistTransaction({ envelope: clientTransaction, networkId: network_id});

});

module.exports = router;