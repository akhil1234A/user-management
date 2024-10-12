import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Utility function to set loading state
const setLoading = (state) => {
  state.status = 'loading';
  state.error = null;
};

// Async thunks for API interactions with JWT token in headers

// Fetch all users
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token; // Retrieve token from auth state
  try {
    const response = await axios.get('http://localhost:3000/api/admin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the users
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch users');
  }
});

// Add new user
export const addUser = createAsyncThunk('admin/addUser', async (user, thunkAPI) => {
  const token = thunkAPI.getState().auth.token; // Retrieve token from auth state
  try {
    const response = await axios.post('http://localhost:3000/api/admin', user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the newly added user
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add user');
  }
});

// Edit user
export const editUser = createAsyncThunk('admin/editUser', async ({ id, userData }, thunkAPI) => {
  const token = thunkAPI.getState().auth.token; // Retrieve token from auth state
  try {
    const response = await axios.put(`http://localhost:3000/api/admin/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user; // Return the updated user
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to edit user');
  }
});

// Delete user
export const deleteUser = createAsyncThunk('admin/deleteUser', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.token; // Retrieve token from auth state
  try {
    await axios.delete(`http://localhost:3000/api/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id; // Return the deleted user ID
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete user');
  }
});

// Admin slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        setLoading(state);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload; // Set users in state
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Capture error message
      })

      // Add user
      .addCase(addUser.pending, (state) => {
        setLoading(state);
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload); // Add new user to the list
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Capture error message
      })

      // Edit user
      .addCase(editUser.pending, (state) => {
        setLoading(state);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedUser = action.payload;
        const index = state.users.findIndex((user) => user._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser; // Update user in the list
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Capture error message
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        setLoading(state);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = state.users.filter((user) => user._id !== action.payload); // Remove user from the list
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Capture error message
      });
  },
});

// Selector to get users from the state
export const selectAllUsers = (state) => state.admin.users;

// Export the reducer to use in the store
export default adminSlice.reducer;
