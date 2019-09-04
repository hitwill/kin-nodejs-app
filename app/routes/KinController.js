const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const KinClient = require('@kinecosystem/kin-sdk-node').KinClient;
const Environment = require('@kinecosystem/kin-sdk-node').Environment;
const client = new KinClient(Environment.Testnet);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const account = client.createKinAccount({
            //your seed goes here//
            seed: process.env.PLAYGROUND_SEED,
            appId: 'chas',
            //channelSecretKeys: ['channel_seed1', 'channel_seed2']
        });

router.post('/create', function(req, res) {
  client.getMinimumFee()
      .then(minFee => {
          account.buildCreateAccount({
              address: req.body.address,
              startingBalance: 100,
              fee: minFee,
              memoText: 'kinwallet'
          }).then(createAccountBuilder => {
              return account.submitTransaction(createAccountBuilder)
          }).then(transactionId => {
              res.status(200).json({transactionId: transactionId});
          }).catch( err => {
              res.status(500).json(err);
          });
      }).catch(err => {
          res.status(500).json(err);
      });
});

router.get('/account', function(req, res) {
  client.getAccountData(req.body.address)
    .then(accountData => {
        res.status(200).json({accountData: accountData});
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.post('/pay', function(req, res) {
  client.getMinimumFee()
    .then(minFee => {
        account.buildSendKin({
            address: req.body.address,
            amount: 100,
            fee: minFee,
            memoText: 'tx memo'
        }).then(builder => {
            return account.submitTransaction(builder)
        }).then(transactionId => {
            res.status(200).json({transactionId: transactionId});
        })
        .catch(err => {
          res.status(500).json(err);
        });
    });
});

router.get('/balance', function(req, res) {
  client.getAccountBalance(req.body.address)
    .then(balance => {
        res.json({balance: balance})
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/transaction', function(req, res) {
  client.getTransactionData(req.body.transactionId)
    .then(transactionData => {
        res.json({transactionData: transactionData});
    })
    .catch(err => {
      res.status(500).json(transactionData);
    });
});

router.get('/whitelist', function(req, res) {
    account.whitelistTransaction({ envelope: req.body.envelope, networkId : req.body.network_id})
    .then(whitelistedString => {
      res.status(200).json(whitelistedString)
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;