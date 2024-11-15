import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/userSlice.js";
import adminReducer from "./features/adminSlice.js"

export const store = configureStore({
  reducer: {
    user : userReducer,
    admin : adminReducer,
  },
})