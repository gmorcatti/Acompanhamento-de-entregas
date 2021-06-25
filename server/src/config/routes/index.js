const auth = require('./auth');
const package = require('./package');

module.exports = app => {
    app.use('/auth', auth);
    app.use('/package', package);
}