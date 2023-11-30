import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
    logOutUser: (state, action) => {
      localStorage.removeItem("loggedInUser");
      toast.success("We mill miss you 😿 ");
      return {
        ...state,
        loggedInUser: "",
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
export const { authorizeUser, setRedirectPath, logOutUser } = userSlice.actions;
export const userSelector = (state) => state.userReducer;
