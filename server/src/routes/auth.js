const router = require('express').Router();
const Admin = require('../controllers/admin');

router.post('/login', Admin.login);
router.post('/register', Admin.register);

module.exports = router;
