import React from "react";
import Layout from "../../Components/Layouts/Layout";
import UserSideBar from "./UserSideBar";
import DeliveryAddress from "../Auth/DeliveryAddress";

const UserProfile = () => {
  return (
    <Layout>
      <div className="flex gap-5 items-center flex-col md:flex-row justify-between">
        <UserSideBar />
        <div className="w-full h-2/3 mt-3">
          <DeliveryAddress />
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
