const mongoose = require('mongoose');

const { MONGO_URL } = process.env

mongoose.connect(MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;