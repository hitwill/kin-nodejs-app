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

app.post('/create', function(req, res) {

    console.log(req.body.address);

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
                console.log(transactionId);
                res.json({transactionId: transactionId});
            }).catch( err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
});

app.get('/account', function(req, res) {

  console.log(req.body.address);

    client.getAccountData(req.body.address)
        .then(accountData => {
            console.log(accountData);
            res.json({accountData: accountData});
        })
});

app.post('/pay', function(req, res) {
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
                console.log(transactionId);
                res.json({transactionId: transactionId});
            });
        });
});

app.get('/balance', function(req, res) {
    client.getAccountBalance(req.body.address)
        .then(balance => {
            console.log(balance);
            res.json({balance: balance})
        });
});

app.get('/transaction', function(req, res) {
    client.getTransactionData(req.body.transactionId)
        .then(transactionData => {
            console.log(transactionData)
            res.json({transactionData: transactionData});
        });
});

app.post('/whitelist', function(req, res) {

    let whitelistTransaction = account.whitelistTransaction({ envelope: req.body.envelope, networkId : req.body.network_id});

    console.log(whitelistTransaction);

    res.send(whitelistTransaction);

});

module.exports = router;