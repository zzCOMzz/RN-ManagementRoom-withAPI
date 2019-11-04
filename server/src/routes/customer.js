const router = require('express').Router();
const CusController = require('../controllers/customerControllers');
const {checkToken} = require('../middlewares/auth');

router.post('/:id', checkToken, CusController.addCustomer);
router.get('/:id', checkToken, CusController.getAllCus);
router.put('/:id/:cusid', checkToken, CusController.updateCus);
router.delete('/:id/:cusid', checkToken, CusController.deleteCus);

module.exports = router;
