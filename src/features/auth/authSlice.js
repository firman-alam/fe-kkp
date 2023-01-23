import { createSlice } from '@reduxjs/toolkit';

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: userToken },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
