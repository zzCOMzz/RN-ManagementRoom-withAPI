const router = require('express').Router();
const CusController = require('../controllers/customerControllers');
const {checkToken} = require('../middlewares/auth');

router.post('/', checkToken, CusController.addCustomer);
router.get('/', checkToken, CusController.getAllCus);
router.put('/:cusid', checkToken, CusController.updateCus);

module.exports = router;
