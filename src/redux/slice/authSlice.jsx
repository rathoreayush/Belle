import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true, // For splash screen or loader
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.autoAuth;
      state.isLoading = false;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload; // true / false
      // you decide when to flip it; keep token untouched
    },
    logout: state => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setCredentials, logout, setLoading, setAuthenticated} =
  authSlice.actions;
export default authSlice.reducer;
