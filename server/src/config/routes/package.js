var router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const packageController = require('../../controllers/packageController');

router.use(authMiddleware);

router.get('/', packageController.teste);

module.exports = router;