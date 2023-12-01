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
  const [showInput, setShowInput] = useState(false);
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
    try {
      const { data } = await axios.post(
        "/admin/create-category",
        { name },
        config
      );
      if (data.success) {
        toast.success(`${data.message}`);
        dispatch(setCategory(data.newCategory));
        setName("");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
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
          <div className="gridContainer gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-bgThree text-textOne w-full  h-[20vh] cursor-pointer flex flex-col  justify-between  rounded-md p-2"
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
