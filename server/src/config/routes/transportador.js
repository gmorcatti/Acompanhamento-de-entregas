var router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const transportadorController = require('../../controllers/transportadorController');

router.use(authMiddleware);

router.get('/name', transportadorController.getName);
router.put('/travelStatus', transportadorController.updateTravelStatus);
router.put('/location', transportadorController.updateLocation);

module.exports = router;