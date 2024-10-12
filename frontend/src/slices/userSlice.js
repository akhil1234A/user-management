import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Async thunk to load the user profile
export const loadUserProfile = createAsyncThunk(
  'user/loadUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Expecting user profile data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load profile');
    }
  }
);

// Async thunk to update the user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (updatedData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.put('http://localhost:3000/api/users/profile', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Ensure correct content type for file uploads
        },
      });
      return response.data; // Expecting updated user profile data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    error: null,
    loading: false,
  },
  reducers: {
    clearProfile(state) {
      state.profile = null;
      // toast.info('Profile cleared');
    },
    clearError(state) {
      state.error = null;
      // toast.dismiss(); // Dismiss existing error messages
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading user profile
      .addCase(loadUserProfile.pending, (state) => {
        state.loading = true; // Indicate loading
        state.error = null; // Clear any previous errors
      })
      .addCase(loadUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload; // Set the profile data
        state.loading = false; // Stop loading
      })
      .addCase(loadUserProfile.rejected, (state, action) => {
        state.loading = false; // Stop loading
        state.error = action.payload; // Set error message
        // toast.error(action.payload); // Show error toast
      })
      // Handle updating user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true; // Indicate loading
        state.error = null; // Clear any previous errors
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload; // Update the profile data
        state.loading = false; // Stop loading
        // toast.success('Profile updated successfully'); // Notify success
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false; // Stop loading
        state.error = action.payload; // Set error message
        // toast.error(action.payload); // Show error toast
      });
  },
});

// Export actions for clearing profile and errors
export const { clearProfile, clearError } = userSlice.actions;
// Export the user slice reducer
export default userSlice.reducer;
