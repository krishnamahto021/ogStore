import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: {},
  redirectPath: null,
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
    setRedirectPath: (state, action) => {
      return {
        ...state,
        redirectPath: action.payload,
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { authorizeUser, setRedirectPath } = userSlice.actions;
export const userSelector = (state) => state.userReducer;
