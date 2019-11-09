require('express-group-routes');
const Express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const serveIndex = require('serve-index');
const app = Express();

const AuthAdminRoutes = require('./routes/auth');
const RoomRoutes = require('./routes/room');
const CusRoutes = require('./routes/customer');
const OrderRoutes = require('./routes/order');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(
  '/images',
  Express.static('uploads/images'),
  serveIndex('uploads/images', {icons: true}),
);
// app.get('*', (req, res) => {
//   res.json({message: 'Welcome'});
// });

app.group('/api/v2', router => {
  router.use('/auth', AuthAdminRoutes);
  router.use('/room', RoomRoutes);
  router.use('/customer', CusRoutes);
  router.use('/order', OrderRoutes);
});

module.exports = app;
