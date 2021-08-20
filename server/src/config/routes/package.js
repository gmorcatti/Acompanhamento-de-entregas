var router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const packageController = require('../../controllers/packageController');

router.get('/exists/:id', packageController.packageExists);
router.get('/getLocation/:id', packageController.getPackageLocation);

router.use(authMiddleware);

router.get('/', packageController.getAllPackages);
router.get('/transportador', packageController.getAllPackagesByTransportador);

router.get('/:id', packageController.getPackageInfo);

router.post('/create', packageController.createPackage);

router.put('/transportador', packageController.setTransportador);

router.delete('/transportador', packageController.removeTransportador);



module.exports = router;