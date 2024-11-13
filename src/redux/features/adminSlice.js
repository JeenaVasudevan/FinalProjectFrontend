import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminAuthorized: false,
  adminData: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Action to save admin data to the state and mark as authorized
    saveAdmin: (state, action) => {
      state.adminAuthorized = true;
      state.adminData = action.payload;
    },
    // Action to clear admin data from the state and mark as not authorized
    clearAdmin: (state) => {
      state.adminAuthorized = false;
      state.adminData = null;
      localStorage.removeItem("token"); // Clear the token from localStorage on logout
    },
  },
});

// Exporting the actions for use in components
export const { saveAdmin, clearAdmin } = adminSlice.actions;

// Exporting the reducer to be added to the store
export default adminSlice.reducer;
