var router = require('express').Router();

const authController = require('../../controllers/authController');

router.get('/verify/:token', authController.verifyToken);
router.post('/register', authController.createTransportador);
router.post('/authenticate', authController.authenticate);

module.exports = router;