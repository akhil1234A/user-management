const express = require('express');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { registerUser, loginUser, uploadProfileImage, getUserProfile, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

// Register User
router.post('/signup', upload.single('profileImage'), registerUser);

// Login User
router.post('/login', loginUser);

// Upload Profile Image
router.post('/upload', protect, upload.single('profileImage'), uploadProfileImage);

// Get User Profile
router.get('/profile', protect, getUserProfile);

// Update User Profile
router.put('/profile', protect, upload.single('image'), updateUserProfile);

module.exports = router;
