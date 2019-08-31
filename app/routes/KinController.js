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
















// // TOKEN VERIFICATION
// router.get('/verify', VerifyToken, function(req, res, next) {

//   //VerifyToken is called first

//   console.log('loc get api/auth/verify');

//   User.findById(req.userId)
//     .select("-password")
//     .exec()
//     .then(user => {
//       if (!user) return res.status(404).send("No user found.");
//       res.status(200).json(user);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });

// });

// // USERNAME & PASSWORD VERIFICATION
// router.get('/login', function (req, res) {

//   console.log('loc get api/auth/login');

//   User.findOne({ 'username': req.query.username })
//     .then(user => {
//           if (!user){
//             return res.status(403).send('User not found');
//           }
//           if(bcrypt.compareSync(req.query.password, user.password)){
//               // create a token
//               let token = jwt.sign({ id: user._id }, config.secret, {
//                 expiresIn: 86400 // expires in 24 hours
//               });

//               console.log(user.username + ' has logged in');

//               return res.status(200).send({ auth: true, token: token });
//           }
//           else{
//               return res.status(403);
//           }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     })
// });

module.exports = router;