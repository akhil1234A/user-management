const express = require('express');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { registerUser, loginUser, uploadProfileImage, getUserProfile, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

// Register User
router.post('/signup', registerUser);

// Login User
router.post('/login', loginUser);

// Upload Profile Image
router.post('/upload', protect, upload.single('profileImage'), uploadProfileImage);

router.get('/profile', protect, getUserProfile); // Add this line to get user profile
router.put('/profile', protect, upload.single('image'), updateUserProfile); // Update user profile


module.exports = router;
