const mongoose = require('mongoose');

const { MONGO_URL } = process.env

mongoose.connect(MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;