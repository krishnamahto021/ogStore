import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminSideBar from "./AdminSideBar";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";

const AdminDashboard = () => {
  const { loggedInUser } = useSelector(userSelector);
  return (
    <Layout>
      <div className="flex flex-col  ">
        {loggedInUser.role === 1 ? <AdminSideBar /> : <></>}
        <div>Hi Admin {loggedInUser.name} </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
