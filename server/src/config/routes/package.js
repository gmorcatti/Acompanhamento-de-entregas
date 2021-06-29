var router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const packageController = require('../../controllers/packageController');

router.use(authMiddleware);

router.post('/create', packageController.createPackage);
router.get('/getLocation/:id', packageController.getPackageLocation);

module.exports = router;