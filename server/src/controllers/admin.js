const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwsSecret} = require('../config');
const Admin = require('../models/admin');

exports.register = async (req, res, next) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  try {
    await Admin.findOne({username}, (err, admin) => {
      if (err) {
        return res.json({message: 'Registration Failed', success: false});
      }
      if (admin) {
        return res.json({
          success: false,
          message: `Username for ${username} are Already in Use`,
        });
      }
      let token = jwt.sign(username, jwsSecret);
      return bcrypt
        .hash(password, 12)
        .then(hassPass => {
          let newUser = new Admin({
            username,
            password: hassPass,
          });
          return newUser.save();
        })
        .then(_ => {
          res.status(200).json({
            success: true,
            message: 'Registration Successful',
            adminId: _._id,
            username: _.username,
            token,
          });
        });
    }).catch(err => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  try {
    await Admin.findOne({username}).then(admin => {
      if (!admin) {
        return res.json({
          success: false,
          message: 'The Username You Entered is Not Registered',
        });
      }

      let token = jwt.sign(username, jwsSecret);
      bcrypt.compare(password, admin.password).then(match => {
        if (match) {
          return res.status(200).json({
            success: true,
            message: 'Login Successfully',
            token,
            adminId: admin._id,
            username: admin.username,
          });
        }

        return res.json({
          success: false,
          message: 'The Password You Entered is Incorrect',
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
