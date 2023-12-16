import React from "react";
import Layout from "../../Components/Layouts/Layout";
import UserSideBar from "./UserSideBar";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../Redux/Reducers/userReducer";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";

// Import react-icons
import { FaEnvelope, FaPhone, FaUser, FaMapMarker } from "react-icons/fa";

const UserProfile = () => {
  const { loggedInUser } = useSelector(userSelector);
  const dispatch = useDispatch();

  return (
    <Layout>
      <div className="flex gap-5 items-center flex-col justify-between">
        <UserSideBar />

        <div className="w-full h-2/3 mt-3 flex items-center justify-center capitalize">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 flex justify-around">
              Your Details
            </h2>

            <div className="mb-4 flex items-center">
              <FaUser className="text-gray-500 mr-2" />
              <p className="text-gray-800">{loggedInUser.name}</p>
            </div>
            <div className="mb-4 flex items-center ">
              <FaEnvelope className="text-gray-500 mr-2 " />
              <p className="text-gray-800 lowercase">{loggedInUser.email}</p>
            </div>

            <div className="mb-4 flex items-center">
              <FaPhone className="text-gray-500 mr-2" />
              <p className="text-gray-800">{loggedInUser.phone}</p>
            </div>

            <div className="flex items-center">
              <FaMapMarker className="text-gray-500 mr-2" />
              <p className="text-gray-800">{loggedInUser.address}</p>
            </div>
            <button
              className="p-2 rounded-md block m-auto mt-3 bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
              onClick={() => dispatch(logOutUser())}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
