import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authorizeUser: (state, action) => {
      return {
        ...state,
        loggedInUser: localStorage.getItem("loggedInUser")
          ? JSON.parse(localStorage.getItem("loggedInUser"))
          : {},
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { authorizeUser } = userSlice.actions;
export const userSelector = (state) => state.userReducer;
