// src/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Async action to fetch users
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
  const response = await axios.get('http://localhost:3000/api/admin');
  return response.data; // Assuming response contains an array of users
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    error: null,
    loading: false,
  },
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload); // Add a new user
      toast.success('User added successfully');
    },
    removeUser(state, action) {
      state.users = state.users.filter(user => user.id !== action.payload); // Remove user by ID
      toast.info('User removed successfully');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true; // Set loading to true while fetching
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false once fetch is complete
        state.users = action.payload; // Set the fetched users
        toast.success('Users fetched successfully');
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.error.message; // Set error message
        toast.error(state.error);
      });
  },
});

export const { addUser, removeUser, clearError } = adminSlice.actions;
export default adminSlice.reducer;
