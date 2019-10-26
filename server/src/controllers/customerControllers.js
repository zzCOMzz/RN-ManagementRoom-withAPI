const Customer = require('../models/customer');

module.exports = {
  addCustomer: async (req, res, next) => {
    const customerName = req.body.customerName;
    const customerID = req.body.customerID;
    const customerPhone = req.body.customerPhone;
    try {
      const newCus = await new Customer({
        customer_name: customerName,
        identity_number: customerID,
        phone_number: customerPhone,
      });

      await newCus.save();
      res.json({message: 'Add New Customer success', success: true});
    } catch (error) {
      console.log(error);
    }
  },
  getAllCus: async (req, res, next) => {
    try {
      const allCus = await Customer.find({});
      res.json({data: allCus});
    } catch (error) {
      console.log(error);
    }
  },
  updateCus: async (req, res, next) => {
    const cusName = req.body.customerName;
    const cusId = req.body.customerId;
    const cusPhone = req.body.customerPhone;
    const cus_Id = req.params.cusid;
    try {
      const updateCus = await Customer.findByIdAndUpdate({_id: cus_Id});
      updateCus.customer_name = cusName;
      updateCus.identity_number = cusId;
      updateCus.phone_number = cusPhone;

      await updateCus.save();
      res.json({message: `Customer ${cusName} Updated`, success: true});
    } catch (error) {
      console.log(error);
    }
  },
};
