import React from "react";
import Layout from "../../Components/Layouts/Layout";
import UserSideBar from "./UserSideBar";

const Orders = () => {
  return (
    <Layout>
      <div className="flex">
        <UserSideBar />
        <div>hi user</div>
      </div>
    </Layout>
  );
};

export default Orders;
