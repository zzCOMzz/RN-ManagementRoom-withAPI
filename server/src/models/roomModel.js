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
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
});

module.exports = mongoose.model('Room', RoomSchema);
