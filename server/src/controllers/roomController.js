const Room = require('../models/roomModel');
const OrderModel = require('../models/order');

module.exports = {
  addNewRoom: async (req, res, next) => {
    try {
      const roomName = req.body.roomName;
      const newRoom = await new Room({
        room_name: roomName,
      });

      await newRoom.save();
      res.json({message: 'Add New Room success', success: true});
    } catch (error) {
      console.log(error);
    }
  },
  getAllRoom: async (req, res, next) => {
    try {
      const allRoom = await Room.find({})
        .populate('order_id')
        .populate('customer_id');

      res.json({data: allRoom});
    } catch (error) {
      console.log(error);
    }
  },
  updateRoom: async (req, res, next) => {
    const roomName = req.body.roomName;
    const roomId = req.params.roomid;
    try {
      const updateRoom = await Room.findByIdAndUpdate({_id: roomId});
      updateRoom.room_name = roomName;
      await updateRoom.save();
      res.json({message: `Room ${roomName} Updated`, success: true});
    } catch (error) {
      console.log(error);
    }
  },
  deleteRoomWithOrder: async (req, res, next) => {
    const roomId = req.params.roomid;
    const orderId = req.params.orderId;
    try {
      await OrderModel.findByIdAndDelete({_id: orderId});
      const roomDel = await Room.findByIdAndDelete({_id: roomId});
      res.json({
        statusCode: 200,
        message: `Room ${roomDel.room_name} was Deleted`,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteRoom: async (req, res, next) => {
    const roomId = req.params.roomid;

    try {
      const roomDel = await Room.findByIdAndDelete({_id: roomId});
      res.json({
        statusCode: 200,
        message: `Room ${roomDel.room_name} was Deleted`,
      });
    } catch (error) {
      console.log(error);
    }
  },
  findRoom: async (req, res, next) => {
    const roomId = req.params.roomid;
    try {
      const room = await Room.findById({_id: roomId})
        .populate('customer_id')
        .populate('order_id');

      res.status(200).json({data: room, success: true});
    } catch (error) {
      console.log(error);
    }
  },
};
