import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  usreRole: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      state.usreRole = action.payload.role;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.usreRole = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
