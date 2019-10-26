const router = require('express').Router();
const {checkToken} = require('../middlewares/auth');
const RoomControllers = require('../controllers/roomController');

router.post('/', checkToken, RoomControllers.addNewRoom);

module.exports = router;
