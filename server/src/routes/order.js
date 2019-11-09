const router = require('express').Router();

const OrderController = require('../controllers/orderController');

const {checkToken} = require('../middlewares/auth');

router.post('/:id', checkToken, OrderController.addNewOrder);
router.get('/:id', checkToken, OrderController.getAllOrder);
router.put('/:id/:orderid', checkToken, OrderController.checkOutOrder);
router.delete('/:id/:orderid', checkToken, OrderController.deleteOrdeById);

module.exports = router;
