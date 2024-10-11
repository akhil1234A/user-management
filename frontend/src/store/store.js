// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import adminReducer from '../slices/adminSlice'; // Assuming you have an admin slice

const store = configureStore({
  reducer: {
    auth: authReducer, // Manages authentication and user sessions
    user: userReducer, // Manages user profile updates and information
    admin: adminReducer, // Handles admin-specific features
  },
});

export default store;
