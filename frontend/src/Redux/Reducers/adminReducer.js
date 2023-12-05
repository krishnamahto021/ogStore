import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  products: [],
  productsByCategory: [],
};

export const getInitialCategories = createAsyncThunk(
  "admin/add-category",
  async (config, thunkAPI) => {
    try {
      const { data } = await axios.get("/admin/get-all-category", config);
      return data.categories;
    } catch (error) {
      console.log(error.response.data);
      if (error.response) {
        toast.error(`Something Went wrong`);
      } else {
        toast.error(`Internal Server Error`);
      }
    }
  }
);

export const getInitialProductsByCategories = createAsyncThunk(
  "/fetch-product-by-category",
  async (cid, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/admin/fetch-product-by-category/${cid}`
      );
      if (data.success) {
        return data.products;
      }
    } catch (error) {
      toast.error(`Something Went wrong !!`);
    }
  }
);

export const getInitialProducts = createAsyncThunk(
  "admin/fetch-product",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/admin/fetch-product");
      return data.products;
    } catch (error) {
      toast.error(`Something Went Wrong`);
    }
  }
);
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      return {
        ...state,
        categories: [action.payload, ...state.categories],
      };
    },
    updateCategory: (state, action) => {
      const { name, id } = action.payload;
      const index = state.categories.findIndex((c) => c._id === id);
      if (index !== -1) {
        return {
          ...state,
          categories: [
            ...state.categories.slice(0, index),
            { ...state.categories[index], name },
            ...state.categories.slice(index + 1),
          ],
        };
      } else {
        toast.error(`No such Category`);
      }
    },
    deleteCategory: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        categories: state.categories.filter((category) => category._id !== id),
      };
    },
    setProduct: (state, action) => {
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === id ? { ...product, ...updatedProduct } : product
        ),
      };
    },

    deleteProduct: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        products: state.products.filter((p) => p._id !== id),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialCategories.fulfilled, (state, action) => {
        return {
          ...state,
          categories: [...action.payload],
        };
      })
      .addCase(getInitialProducts.fulfilled, (state, action) => {
        return {
          ...state,
          products: [...action.payload],
        };
      })
      .addCase(getInitialProductsByCategories.fulfilled, (state, action) => {
        return {
          ...state,
          productsByCategory: [...action.payload],
        };
      });
  },
});

export const adminReducer = adminSlice.reducer;
export const {
  setCategory,
  updateCategory,
  deleteCategory,
  setProduct,
  updateProduct,
  deleteProduct,
} = adminSlice.actions;
export const adminSelector = (state) => state.adminReducer;
