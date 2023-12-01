import axios from "axios";
import React, { useState } from "react";
import {
  deleteCategory,
  updateCategory,
} from "../../Redux/Reducers/adminReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSelector } from "../../Redux/Reducers/userReducer";

const CategoryCard = ({ category }) => {
  const [showInput, setShowInput] = useState(false);
  const [newName, setnewName] = useState(category.name);
  const { loggedInUser } = useSelector(userSelector);
  const dispatch = useDispatch();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };
  const handleEdit = async (id) => {
    try {
      const { data } = await axios.put(
        `/admin/update-category/${id}`,
        { name: newName },
        config
      );
      dispatch(updateCategory({ id, name: newName }));
      if (data.success) {
        toast.success(`${data.message}`);
      }
      setShowInput(!showInput);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        toast.error(
          `${error.response.data.message} || Error In updating the category`
        );
      }
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/admin/delete-category/${id}`,
        config
      );
      if (data.success) {
        toast.success(`${data.message}`);
        dispatch(deleteCategory({ id }));
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `${error.response.data.message || "Error in deleting category"}`
        );
      }
    }
  };
  return (
    <>
      <div>
        {showInput ? (
          <div className="flex gap-2 justify-between">
            <input
              placeholder="Enter your new category"
              className="p-1 rounded-md bg-bgOne w-full focus:outline-none"
              value={newName}
              onChange={(e) => setnewName(e.target.value)}
            ></input>
            <button
              onClick={() => handleEdit(category._id)}
              className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
            >
              Save
            </button>
          </div>
        ) : (
          `${category.name}`
        )}
      </div>
      <div className="butttonsContainer w-full flex items-center gap-4 justify-center text-sm sm:text-lg">
        <button
          type="submit"
          onClick={() => setShowInput(!showInput)}
          className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
        >
          Update Category
        </button>

        <button
          type="submit"
          onClick={() => handleDelete(category._id)}
          className="p-2 rounded-md bg-red-600 text-textThree hover:bg-bgOne hover:text-textOne duration-300"
        >
          Delete Category
        </button>
      </div>
    </>
  );
};

export default CategoryCard;
