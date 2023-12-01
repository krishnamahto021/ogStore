import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { adminReducer } from "./Reducers/adminReducer";
export const store = configureStore({
  reducer: {
    userReducer,
    adminReducer,
  },
});
