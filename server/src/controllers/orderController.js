const Order = require('../models/order');
const Customer = require('../models/customer');
const RoomModel = require('../models/roomModel');
const moment = require('moment');

module.exports = {
  addNewOrder: async (req, res, next) => {
    const roomId = req.body.roomId;
    const cusId = req.body.customerId;
    const duration = req.body.duration;
    try {
      const newOrder = new Order({
        room_id: roomId,
        customer_id: cusId,
        duration,
        is_booked: true,
      });
      await RoomModel.findByIdAndUpdate(
        {_id: roomId},
        {
          is_booked: true,
        },
      );
      await newOrder.save();
      const customer = Customer.findById({_id: cusId});
      res
        .status(200)
        .json({message: `Add New Order for ${customer.name} Success`});
    } catch (error) {
      console.log(error);
    }
  },
  updateOrder: async (req, res, next) => {},
};
