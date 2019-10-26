const Room = require('../models/roomModel');

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
      const allRoom = await Room.find({});
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
};
