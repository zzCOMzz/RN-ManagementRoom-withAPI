const router = require('express').Router();
const OrderController = require('../controllers/orderController');
const {checkToken} = require('../middlewares/auth');
router.post('/', checkToken, OrderController.addNewOrder);
router.get('/', checkToken, OrderController.getAllOrder);
router.put('/:orderid', checkToken, OrderController.checkOutOrder);

module.exports = router;
