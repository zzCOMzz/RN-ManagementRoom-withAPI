const multer = require('multer');

exports.multer = multer;

exports.photoCustomer = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.file);
    console.log(req.body);
    console.log('######### UPLOAD PHOTO  #########');
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg'
    ) {
      cb(true, '');
    } else {
      cb(null, 'uploads/images/');
    }
  },
  filename: (req, file, cb) => {
    req.customerPhoto = `images/${new Date()}-${file.originalname}`;
    cb(null, `${new Date()}-${file.originalname}`);
  },
});
