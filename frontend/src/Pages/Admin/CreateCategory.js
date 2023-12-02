import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminSideBar from "./AdminSideBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";
import { toast } from "react-toastify";
import {
  adminSelector,
  getInitialState,
  setCategory,
} from "../../Redux/Reducers/adminReducer";
import CategoryCard from "./CategoryCard";
const CreateCategory = () => {
  const [name, setName] = useState("");
  const [sizes, setSizes] = useState("");
  const { loggedInUser } = useSelector(userSelector);
  const { categories } = useSelector(adminSelector);
  const dispatch = useDispatch();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sizesArray = sizes.split(",").map((size) => size.trim());
    console.log(sizesArray);
    try {
      const { data } = await axios.post(
        "/admin/create-category",
        { name, sizes: sizesArray },
        config
      );
      if (data.success) {
        toast.success(`${data.message}`);
        dispatch(setCategory(data.newCategory));
        setName("");
        setSizes("");
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Something Went Wrong`);
      } else {
        toast.error(`Internal server Error`);
      }
    }
  };

  useEffect(() => {
    dispatch(getInitialState(config));
  }, []);
  return (
    <Layout>
      <div className="flex justify-between flex-col gap-4">
        <AdminSideBar />
        <div className="createCategoryContainer w-full  bg-bgThree p-2 rounded-md">
          <form className="createCategoryForm" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 justify-between">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Category name"
                className="p-1 rounded-sm bg-bgOne focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <div className="flex flex-col gap-2 justify-between">
              <label htmlFor="sizes">Size</label>
              <input
                type="text"
                placeholder="Enter Sizes with Comma"
                className="p-1 rounded-sm bg-bgOne focus:outline-none"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                required
              ></input>
            </div>

            <div className="flex justify-around mt-5">
              <button
                type="submit"
                className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
        <div className="categoriesContainer p-2 w-full">
          <div className="gridContainer h-[20vh] md:h-[30vh] gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-bgThree text-textOne  cursor-pointer flex flex-col gap-2  justify-between  rounded-md p-2"
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
