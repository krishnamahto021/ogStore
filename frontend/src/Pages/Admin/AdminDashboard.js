import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminSideBar from "./AdminSideBar";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="flex  ">
        <AdminSideBar />
        <div>hi ogstore</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
