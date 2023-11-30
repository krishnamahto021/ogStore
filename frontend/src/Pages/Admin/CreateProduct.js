import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminSideBar from "./AdminSideBar";

const CreateProduct = () => {
  return (
    <Layout>
      <div className="flex  ">
        <AdminSideBar />
        <div>Create Product</div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
