const auth = require('./auth');
const package = require('./package');
const transportador = require('./transportador');

module.exports = app => {
    app.use('/auth', auth);
    app.use('/package', package);
    app.use('/transportador', transportador);
    app.get('/', (req, res) => res.send({ Status: 'Ligada' }))
}