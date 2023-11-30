import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminSideBar from "./AdminSideBar";

const CreateCategory = () => {
  return (
    <Layout>
      <div className="flex  ">
        <AdminSideBar />
        <div>Create Categories</div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
