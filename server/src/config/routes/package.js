var router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const packageController = require('../../controllers/packageController');

router.get('/exists/:id', packageController.packageExists);
router.get('/getLocation/:id', packageController.getPackageLocation);


router.get('/transportador', packageController.getAllPackagesByTransportador);

router.get('/:id', packageController.getPackageInfo);

router.post('/create', packageController.createPackage);


router.put('/transportador', packageController.setTransportador);

router.use(authMiddleware);


module.exports = router;