const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.dburl, { useNewUrlParser: true });

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))