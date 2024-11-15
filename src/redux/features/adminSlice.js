import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminAuthorized: false,
  adminData: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    saveAdmin: (state, action) => {
      state.adminAuthorized = true;
      state.adminData = action.payload;
    },
    clearAdmin: (state) => {
      state.adminAuthorized = false;
      state.adminData = null;
      localStorage.removeItem("token");
    },
  },
});

export const { saveAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;
