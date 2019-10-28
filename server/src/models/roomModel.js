const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  room_name: {
    type: String,
    required: true,
  },
  is_booked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Room', RoomSchema);
