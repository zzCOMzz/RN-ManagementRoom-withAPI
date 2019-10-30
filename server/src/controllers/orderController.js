const Order = require('../models/order');
const Customer = require('../models/customer');
const RoomModel = require('../models/roomModel');
const moment = require('moment-timezone');

let localTime = moment.tz('Asia/Jakarta').format();

module.exports = {
  addNewOrder: async (req, res, next) => {
    const adminId = req.params.id;
    const roomId = req.body.roomId;
    const cusId = req.body.customerId;
    const duration = req.body.duration;
    try {
      console.log(req.body);
      const newOrder = new Order({
        admin_id: adminId,
        room_id: roomId,
        customer_id: cusId,
        duration,
        is_booked: true,
        order_end_time: localTime,
      });

      const room = await RoomModel.findByIdAndUpdate(
        {_id: roomId},
        {
          is_booked: true,
          order_id: newOrder._id,
          customer_id: cusId,
        },
      );
      const customer = await Customer.findByIdAndUpdate(
        {_id: cusId},
        {
          is_order_in_room: roomId,
        },
      );
      await newOrder.save();
      res
        .status(200)
        .json({message: `Add New Order for ${customer.name} Success`});
    } catch (error) {
      console.log(error);
    }
  },
  getAllOrder: async (req, res, next) => {
    const adminId = req.params.id;
    try {
      const order = await Order.find({admin_id: adminId})
        .populate('room_id')
        .populate('customer_id');
      res.json({data: order, message: 'get order success'});
    } catch (error) {
      console.log(error);
    }
  },
  checkOutOrder: async (req, res, next) => {
    const orderId = req.params.orderid;
    const roomId = req.body.roomId;

    try {
      const checkout = await Order.findByIdAndUpdate(
        {_id: orderId},
        {
          is_done: true,
          is_booked: false,
          order_end_time: localTime,
        },
      );
      const room = await RoomModel.findByIdAndUpdate(
        {_id: roomId},
        {
          is_booked: false,
        },
      );
      res.status(200).json({message: 'CheckOut Order Success', success: true});
    } catch (error) {
      console.log(error);
    }
  },
};
