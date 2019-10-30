require('express-group-routes');
const Express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = Express();

const AuthAdminRoutes = require('./routes/auth');
const RoomRoutes = require('./routes/room');
const CusRoutes = require('./routes/customer');
const OrderRoutes = require('./routes/order');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// app.get('*', (req, res) => {
//   res.json({message: 'Welcome'});
// });

app.group('/api/v2', router => {
  router.use('/auth', AuthAdminRoutes);
  router.use('/:id/room', RoomRoutes);
  router.use('/:id/customer', CusRoutes);
  router.use('/:id/order', OrderRoutes);
});

module.exports = app;
