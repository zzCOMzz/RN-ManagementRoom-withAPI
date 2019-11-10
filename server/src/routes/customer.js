const router = require('express').Router();
const CusController = require('../controllers/customerControllers');
const {checkToken} = require('../middlewares/auth');

const {photoCustomer, multer} = require('../middlewares/multer');

const uploadPhotoCustomer = multer({storage: photoCustomer});
router.post(
  '/:id',
  checkToken,
  uploadPhotoCustomer.single('photo'),
  CusController.addCustomer,
);
router.get('/:id', checkToken, CusController.getAllCus);
router.put(
  '/:id/:cusid',
  checkToken,
  uploadPhotoCustomer.single('photo'),
  CusController.updateCus,
);
router.delete('/:id/:cusid', checkToken, CusController.deleteCus);

module.exports = router;
