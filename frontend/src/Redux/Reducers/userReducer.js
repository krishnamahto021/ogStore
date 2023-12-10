import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  loggedInUser: {},
  redirectPath: null,
  cartItems: [],
  buyNow: {},
};
export const fetchCartItems = createAsyncThunk(
  "user/fetch-cart-items",
  async (config, thunkAPI) => {
    try {
      const { data } = await axios.get("/user/fetch-cart-items", config);
      if (data.success) {
        return data.cartItems;
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Something went wrong`);
      } else {
        toast.error(`Internal server error`);
      }
    }
  }
);
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
    setCart: (state, action) => {
      return {
        ...state,
        cartItems: [action.payload, ...state.cartItems],
      };
    },
    updateCart: (state, action) => {
      const updatedPrdouct = state.cartItems.map((item) =>
        item._id === action.payload.product._id ? action.payload.product : item
      );
      return {
        ...state,
        cartItems: updatedPrdouct,
      };
    },
    setBuyNow: (state, action) => {
      return {
        ...state,
        buyNow: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      return {
        ...state,
        cartItems: [...action.payload],
      };
    });
  },
});

export const userReducer = userSlice.reducer;
export const {
  authorizeUser,
  setRedirectPath,
  logOutUser,
  setCart,
  updateCart,
  setBuyNow,
} = userSlice.actions;
export const userSelector = (state) => state.userReducer;
