const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  room_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Room',
  },
  customer_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  duration: {
    type: Number,
    required: true,
  },
  order_end_time: {
    type: Date,
    default: Date.now(),
  },
  is_done: {
    type: Boolean,
    default: false,
  },
  is_booked: {
    type: Boolean,
    default: false,
  },
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
});

module.exports = mongoose.model('Order', OrderSchema);
