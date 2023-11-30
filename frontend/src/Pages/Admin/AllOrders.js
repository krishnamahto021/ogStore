import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminSideBar from "./AdminSideBar";

const AllOrders = () => {
  return (
    <Layout>
      <div className="flex  ">
        <AdminSideBar />
        <div>All orders</div>
      </div>
    </Layout>
  );
};
export default AllOrders;
