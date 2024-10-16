const User = require('../models/User');
const bcrypt = require('bcryptjs')

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user by ID (Admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);;
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role by ID (Admin only)
const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = req.body.role || user.role;
    await user.save();

    res.json({ message: 'User role updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new user (Admin only)
const addUser = async (req, res) => {
  const { name, email, password, role } = req.body; // Include role if necessary
  const profileImage = req.file ? req.file.path: null; // Check for uploaded file

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user', // Default to 'user' if no role provided
      profileImage, // Save the profile image path
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update user details by ID (Admin only)
// Update user details by ID (Admin only)
const updateUserDetails = async (req, res) => {
  const { name, email} = req.body;
  let profileImage;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided in the request
    if (name) user.name = name;
    if (email) user.email = email;
   

    // Check if there is an uploaded image
    if (req.file) {
      profileImage = req.file.path;
      user.profileImage = profileImage; // Update the profile image path
    }

    await user.save();

    res.json({
      message: 'User details updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage, // Include the updated profile image
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
  addUser,
  updateUserDetails, // Export the new updateUserDetails function
};
