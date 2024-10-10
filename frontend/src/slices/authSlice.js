import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('user'); // Load user from localStorage if it exists
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
      localStorage.setItem('token', token);

      // Console log to verify the state is updated correctly
      console.log('User logged in:', state.user); // Check if user is stored
      console.log('Token stored:', state.token);   // Check if token is stored
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
