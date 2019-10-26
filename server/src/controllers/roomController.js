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
};
