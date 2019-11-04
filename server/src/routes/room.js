const router = require('express').Router();
const {checkToken} = require('../middlewares/auth');
const RoomControllers = require('../controllers/roomController');

router.post('/:id', checkToken, RoomControllers.addNewRoom);
router.get('/:id', checkToken, RoomControllers.getAllRoom);
router.get('/:id/:roomid', checkToken, RoomControllers.findRoom);
router.put('/:id/:roomid', checkToken, RoomControllers.updateRoom);
router.delete(
  '/:id/:roomid/:orderId',
  checkToken,
  RoomControllers.deleteRoomWithOrder,
);
router.delete('/:id/:roomid', checkToken, RoomControllers.deleteRoom);

module.exports = router;
