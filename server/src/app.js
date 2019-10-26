require('express-group-routes');
const Express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = Express();

const AuthAdminRoutes = require('./routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('*', (req, res) => {
  res.json({message: 'Welcome'});
});

app.group('/api/v2', router => {
  router.use('/auth', AuthAdminRoutes);
});

module.exports = app;
