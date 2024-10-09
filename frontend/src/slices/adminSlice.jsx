import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: null,
  token: localStorage.getItem('adminToken') || null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      const { admin, token } = action.payload;
      state.admin = admin;
      state.token = token;
      localStorage.setItem('adminToken', token);
    },
    adminLogout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem('adminToken');
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
