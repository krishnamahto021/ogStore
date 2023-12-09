import React, { useState } from "react";
import { BsTruck } from "react-icons/bs";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const DeliveryAddress = () => {
  const { loggedInUser } = useSelector(userSelector);
  const [email, setEmail] = useState(loggedInUser.email);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(loggedInUser.address);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setphone] = useState(loggedInUser.phone);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "/user/update",
        {
          email,
          password,
          address,
          phone,
        },
        config
      );
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(`Something went Wrong`);
      }
    }
  };

  return (
    <div className="formOuterContainer  flex justify-center items-center bg-authImage bg-cover bg-center h-[85vh]  -mt-6 ">
      <form
        className="formContainer bg-authImage rounded-md bg-cover bg-center  flex flex-col gap-2 justify-between h-fit w-3/4 md:w-1/2 lg:w-1/3  p-2 shadow-sm shadow-[#495057] "
        onSubmit={handleSubmit}
      >
        <h1 className="text-center p-1 text-lg font-semibold text-textOne flex items-center justify-evenly">
          Delivery Address <BsTruck />
        </h1>
        <div className="flex flex-col gap-2 justify-between">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-1 rounded-sm bg-bgThree focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled
          ></input>
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <label htmlFor="password">Password</label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Enter your password"
            className="p-1 rounded-sm bg-bgThree focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <span
            className="ml-[90%] -mt-8 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Enter your Full Address"
            className="p-1 rounded-sm bg-bgThree focus:outline-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            placeholder="Enter Phone Number"
            className="p-1 rounded-sm bg-bgThree focus:outline-none"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          ></input>
        </div>

        <div className="flex justify-around mt-5">
          <button
            type="submit"
            className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgThree hover:text-textOne duration-300"
          >
            Update Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryAddress;
