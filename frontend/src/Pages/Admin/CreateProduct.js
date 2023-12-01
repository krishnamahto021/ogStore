import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminSideBar from "./AdminSideBar";

const CreateProduct = () => {
  const handleSubmit = async () => {};
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  return (
    <Layout>
      <div className="flex  justify-between flex-col gap-4">
        <AdminSideBar />
        <div className="productFormContainer flex flex-col ">
          <form className="createCategoryForm" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 justify-between">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Product name"
                className="p-1 rounded-sm bg-bgOne focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <div className="flex flex-col gap-2 justify-between">
              <label htmlFor="price">price</label>
              <input
                type="number"
                placeholder="Enter Product price"
                className="p-1 rounded-sm bg-bgOne focus:outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              ></input>
            </div>
            <div className="flex flex-col gap-2 justify-between">
              <label htmlFor="category">category</label>
              <input
                type="text"
                placeholder="Enter Product name"
                className="p-1 rounded-sm bg-bgOne focus:outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
      </div>
    </Layout>
  );
};

export default CreateProduct;
