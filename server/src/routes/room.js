const router = require('express').Router();
const {checkToken} = require('../middlewares/auth');
const RoomControllers = require('../controllers/roomController');

router.post('/', checkToken, RoomControllers.addNewRoom);
router.get('/', checkToken, RoomControllers.getAllRoom);
router.get('/:roomid', checkToken, RoomControllers.findRoom);
router.put('/:roomid', checkToken, RoomControllers.updateRoom);
router.delete(
  '/:roomid/:orderId',
  checkToken,
  RoomControllers.deleteRoomWithOrder,
);
router.delete('/:roomid', checkToken, RoomControllers.deleteRoom);

module.exports = router;
