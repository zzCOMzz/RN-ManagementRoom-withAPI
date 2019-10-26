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
});

module.exports = mongoose.model('Customer', CustomerSchema);
