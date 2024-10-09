const express = require('express');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { registerUser, loginUser, uploadProfileImage } = require('../controllers/userController');

const router = express.Router();

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Upload Profile Image
router.post('/upload', protect, upload.single('profileImage'), uploadProfileImage);

module.exports = router;
