const router = require('express').Router();
const OrderController = require('../controllers/orderController');

router.post('/', OrderController.addNewOrder);

module.exports = router;
