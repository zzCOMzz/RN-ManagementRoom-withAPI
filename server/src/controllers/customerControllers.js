const Customer = require('../models/customer');

module.exports = {
  addCustomer: async (req, res, next) => {
    const adminId = req.params.id;
    const customerName = req.body.customerName;
    const customerID = req.body.customerID;
    const customerPhone = req.body.customerPhone;
    const customerPhoto = req.customerPhoto;

    try {
      const newCus = await new Customer({
        name: customerName,
        identity_number: customerID,
        phone_number: Number(customerPhone),
        admin_id: adminId,
        photo: customerPhoto,
      });

      await newCus.save();
      res.json({message: 'Add New Customer success', success: true});
    } catch (error) {
      console.log(error);
    }
  },
  getAllCus: async (req, res, next) => {
    const adminId = req.params.id;
    try {
      const allCus = await Customer.find({admin_id: adminId}).populate(
        'is_order_in_room',
      );
      res.json({data: allCus});
    } catch (error) {
      console.log(error);
    }
  },
  updateCus: async (req, res, next) => {
    const adminId = req.params.id;
    const cusName = req.body.customerName;
    const cusId = req.body.customerID;
    const cusPhone = req.body.customerPhone;
    const cus_Id = req.params.cusid;
    const customerPhoto = req.customerPhoto;

    try {
      if (customerPhoto == undefined) {
        await Customer.findOneAndUpdate(
          {_id: cus_Id},
          {
            name: cusName,
            identity_number: cusId,
            phone_number: cusPhone,
          },
          (err, customer) => {
            if (err) {
              res.json({message: 'Error On Update', success: false});
            }

            res.json({message: `Customer ${cusName} Updated`, success: true});
          },
        );
      } else {
        await Customer.findOneAndUpdate(
          {_id: cus_Id},
          {
            name: cusName,
            identity_number: cusId,
            phone_number: cusPhone,
            photo: customerPhoto,
          },
          (err, customer) => {
            if (err) {
              res.json({message: 'Error On Update', success: false});
            }

            res.json({message: `Customer ${cusName} Updated`, success: true});
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteCus: async (req, res, next) => {
    const cusId = req.params.cusid;
    try {
      const delCus = await Customer.findByIdAndDelete({_id: cusId});
      res.json({
        statusCode: 200,
        message: `Customer ${delCus.name} was Deleted`,
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
