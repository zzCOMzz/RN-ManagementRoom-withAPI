require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds041556.mlab.com:41556/management_room`,
  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
);

module.exports = mongoose;
