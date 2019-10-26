require('dotenv').config();

module.exports = {
  jwsSecret: process.env.JWT_SECRET,
};
