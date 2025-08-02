// middleware/multer/multer.js
const multer = require('multer');

const storage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg','image/svg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG,SVG and JPG  images are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
