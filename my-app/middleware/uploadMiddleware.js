// /config/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_images',  // Folder name in Cloudinary
    format: async (req, file) => 'png', // Convert to png format
    public_id: (req, file) => `${Date.now()}-${file.originalname}`  // Filename
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(file.originalname.toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Images only!')); // Only allow image file types
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
