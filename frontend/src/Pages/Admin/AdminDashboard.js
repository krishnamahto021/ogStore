import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminSideBar from "./AdminSideBar";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";

const AdminDashboard = () => {
  const { loggedInUser } = useSelector(userSelector);
  return (
    <Layout>
      <div className="flex  ">
        <AdminSideBar />
        <div>Hi {loggedInUser.name} </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
