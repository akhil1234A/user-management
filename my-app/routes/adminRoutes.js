const express = require('express');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { getAllUsers, deleteUser, updateUserRole } = require('../controllers/adminController');

const router = express.Router();

// Get all users (Admin only)
router.get('/', protect, admin, getAllUsers);

// Delete user by ID (Admin only)
router.delete('/:id', protect, admin, deleteUser);

// Update user role by ID (Admin only)
router.put('/:id', protect, admin, updateUserRole);

module.exports = router;
