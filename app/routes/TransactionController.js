// //Add transactinon to User
// router.post('/transaction/:id', function (req, res) {
//     User
//       .findById(req.params.id)
//       .exec()
//       .then(user => {
//         user.transactions.push(transaction);
//         user.save().then(function(result){
//           res.status(200).json(user);
//         })
//         .catch(err => {
//           res.status(500).json({error: err});
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//       });
// });

// //Get a single user transaction by id
// router.post('/transaction/:id', function (req, res) {
//     User
//       .findById(req.params.id)
//       .exec()
//       .then(user => {
//         user.transactions.push(transaction);
//         user.save().then(function(result){
//           res.status(200).json(user);
//         })
//         .catch(err => {
//           res.status(500).json({error: err});
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//       });
// });