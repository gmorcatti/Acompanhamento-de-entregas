var router = require('express').Router();

const authController = require('../../controllers/authController');

router.post('/register', authController.createTransportador);
router.post('/authenticate', authController.authenticate);

module.exports = router;