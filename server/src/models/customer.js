const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  identity_number: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  is_order_in_room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  },
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
});

module.exports = mongoose.model('Customer', CustomerSchema);
