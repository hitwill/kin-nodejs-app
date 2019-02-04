const express = require('express');
const router = express.Router();
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function(req, res) {
	res.redirect('../../');
});

module.exports = router;