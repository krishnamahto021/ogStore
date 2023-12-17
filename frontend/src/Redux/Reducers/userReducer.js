import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  loggedInUser: {},
  redirectPath: null,
  cartItems: [],
  buyNow: {},
  orders: [],
  favorites: [],
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
export const fetchOrders = createAsyncThunk(
  "user/fetch-orders",
  async (config, thunkAPI) => {
    try {
      const { data } = await axios.get("/user/fetch-orders", config);
      if (data.success) {
        return data.orders;
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

export const fetchFavorites = createAsyncThunk(
  "/user/fetch-favorites",
  async (config, thunkAPI) => {
    try {
      const { data } = await axios.get("/user/fetch-favorites", config);
      if (data.success) {
        return data.favorites;
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Something went wrong`);
      } else {
        toast.error(`Internal Server error`);
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
    setOrders: (state, action) => {
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload._id;
      const existingFavIndex = state.favorites.findIndex(
        (item) => item.product._id === productId
      );

      if (existingFavIndex !== -1) {
        const filteredFav = state.favorites.filter(
          (p) => p.product._id !== productId
        );
        return {
          ...state,
          favorites: [...filteredFav],
        };
      } else {
        return {
          ...state,
          favorites: [{ product: action.payload }, ...state.favorites],
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        return {
          ...state,
          cartItems: [...action.payload],
        };
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        return {
          ...state,
          orders: [...action.payload],
        };
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        return {
          ...state,
          favorites: [...action.payload],
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
  toggleFavorite,
} = userSlice.actions;
export const userSelector = (state) => state.userReducer;
