const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  customer_name: {
    Type: String,
  },
  identity_number: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Customer', CustomerSchema);
