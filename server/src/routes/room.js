const router = require('express').Router();
const {checkToken} = require('../middlewares/auth');
const RoomControllers = require('../controllers/roomController');

router.post('/', checkToken, RoomControllers.addNewRoom);
router.get('/', checkToken, RoomControllers.getAllRoom);

module.exports = router;
