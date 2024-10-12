const express = require('express');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
  getAllUsers,
  deleteUser,
  updateUserRole,
  addUser,
  updateUserDetails, // Import the updateUserDetails function
} = require('../controllers/adminController');

const router = express.Router();

// Get all users (Admin only)
router.get('/', getAllUsers);

// Delete user by ID (Admin only)
router.delete('/:id', deleteUser);

// Update user role by ID (Admin only)
router.put('/:id/role', updateUserRole); // Update role separately

// Update user details by ID (Admin only)
router.put('/:id', upload.single('image') , updateUserDetails); // New route for updating user details

// Add a new user (Admin only)
router.post('/', upload.single('image'), addUser); // New route for adding a user

// router.post('/', protect, admin, addUser);

module.exports = router;
