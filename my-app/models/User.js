const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user'}, // 'admin' or 'user'
  profileImage: {type: String} // URL or file path
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
