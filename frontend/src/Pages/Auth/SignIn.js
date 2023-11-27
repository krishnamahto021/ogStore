import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Layout>
      <div className="formOuterContainer flex justify-center items-center bg-authImage bg-cover bg-center h-[85vh]  -mt-6 ">
        <form className="formContainer bg-authImage rounded-md bg-cover bg-center  flex flex-col gap-2 justify-between h-fit w-3/4 md:w-1/2 lg:w-1/3  p-2 shadow-sm shadow-[#495057] ">
          <h1 className="text-center p-1 text-lg font-semibold text-textOne">
            Get free Delivery With your first order
          </h1>
          <div className="flex flex-col gap-2 justify-between">
            <label for="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-1 rounded-sm bg-bgThree focus:outline-none"
              required
            ></input>
          </div>

          <div className="flex flex-col gap-2 justify-between">
            <label for="password">Password</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter your password"
              className="p-1 rounded-sm bg-bgThree focus:outline-none"
              required
            ></input>
            <span
              className="ml-[90%] -mt-8 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="flex justify-around mt-5">
            <button
              type="submit"
              className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgThree hover:text-textOne duration-300"
            >
              Shop Now
            </button>
          </div>
          <Link
            to="/sign-up"
            className="text-center text-lg underline text-textOne hover:scale-105 duration-300"
          >
            New to ogStore??
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
