import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
  error: null,
  loading: false,
};

// Async action for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', credentials);
      return response.data; // Expecting { token, user, role }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async action for registering a user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', userData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response.data; // Expecting { token, user, role }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Async action to load user from token
export const loadUserFromToken = createAsyncThunk(
  'auth/loadUserFromToken',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await axios.get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Expecting user data with role
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      // toast.info('Logged out successfully');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login flow
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.loading = false;
        // toast.success('Logged in successfully');
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('role', action.payload.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        // toast.error(state.error);
      })
      
      // Register flow
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.loading = false;
        // toast.success('Registered successfully');
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('role', action.payload.role);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        // toast.error(state.error);
      })

      // Load user from token
      .addCase(loadUserFromToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload; // Assuming this contains the user data
        console.log(state.user)
        state.role = action.payload.role; // Ensure role is set from the token payload
        state.loading = false;
        localStorage.setItem('role', action.payload.role); // Store role again
        // toast.success('User loaded from token');
      })
      .addCase(loadUserFromToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // toast.error(state.error);
      });
  },
});

// Export actions and reducer
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
