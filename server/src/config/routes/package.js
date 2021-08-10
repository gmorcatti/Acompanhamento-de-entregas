var router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const packageController = require('../../controllers/packageController');

router.use(authMiddleware);

router.get('/transportador', packageController.getAllPackagesByTransportador);

router.get('/:id', packageController.getPackageInfo);
router.get('/exists/:id', packageController.packageExists);
router.get('/getLocation/:id', packageController.getPackageLocation);

router.post('/create', packageController.createPackage);


router.put('/transportador', packageController.setTransportador);



module.exports = router;