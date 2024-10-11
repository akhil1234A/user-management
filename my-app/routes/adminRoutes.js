const express = require('express');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
  addUser,
  updateUserDetails, // Import the updateUserDetails function
} = require('../controllers/adminController');

const router = express.Router();

// Get all users (Admin only)
router.get('/', protect, admin, getAllUsers);

// Delete user by ID (Admin only)
router.delete('/:id', protect, admin, deleteUser);

// Update user role by ID (Admin only)
router.put('/:id/role', protect, admin, updateUserRole); // Update role separately

// Update user details by ID (Admin only)
router.put('/:id', protect, admin, updateUserDetails); // New route for updating user details

// Add a new user (Admin only)
router.post('/', protect, admin, addUser); // New route for adding a user

module.exports = router;
