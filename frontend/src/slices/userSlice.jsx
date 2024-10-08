import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: null },
  reducers: {
    loginSuccess: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null; 
    }
  }
})

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

// Async action to log in user
export const loginUser = (email, password) => async (dispatch) => { // Corrected parameter name
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await axios.post('http://localhost:3000/api/users/login', { email, password }, config); // Fixed the port number here as well
    dispatch(loginSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
