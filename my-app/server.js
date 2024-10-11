const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); // Add path module
require('dotenv').config();

const app = express();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(cors());
app.use(express.json()); // to parse JSON data

// Serving static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // <-- Add this line

app.get('/api', (req, res) => {
  res.send('API is running');
});

// Use User and Admin routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
