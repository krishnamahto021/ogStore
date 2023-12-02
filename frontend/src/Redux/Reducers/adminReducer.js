import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
};

export const getInitialState = createAsyncThunk(
  "admin/add-category",
  async (config, thunkAPI) => {
    try {
      const { data } = await axios.get("/admin/get-all-category", config);
      return data.categories;
    } catch (error) {
      console.log(error.response.data);
      if (error.response) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error(`Internal Server Error`);
      }
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
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialState.fulfilled, (state, action) => {
      return {
        ...state,
        categories: [...action.payload],
      };
    });
  },
});

export const adminReducer = adminSlice.reducer;
export const { setCategory, updateCategory, deleteCategory } =
  adminSlice.actions;
export const adminSelector = (state) => state.adminReducer;
