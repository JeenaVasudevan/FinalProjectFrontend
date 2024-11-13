import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userAuthorized: false,
    userData: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.userAuthorized = true;
            state.userData = action.payload;
        },
        clearUser: (state) => {
            state.userAuthorized = false;
            state.userData = null;
            localStorage.removeItem("token"); // Clear token on logout
        },
    },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
