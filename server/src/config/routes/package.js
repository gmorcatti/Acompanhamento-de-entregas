var router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const packageController = require('../../controllers/packageController');

router.get('/getLocation/:id', packageController.getPackageLocation);
router.post('/create', packageController.createPackage);

router.use(authMiddleware);


module.exports = router;