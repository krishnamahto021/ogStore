import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const clearInput = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await axios.post("/user/signUp", {
      name,
      email,
      password,
      phone,
      address,
    });
    if (data.status === 200) {
      toast.success("User Already Exists");
      navigate("/sign-in");
    } else if (data.status === 201) {
      toast.success("Verify Email for Sneaker Exclusive");

      navigate("/sign-up");
    } else {
      toast.error("Internal server Error");
      navigate("/");
    }
    clearInput();
  };
  return (
    <Layout
      title={"Sign Up | ogStore"}
      author={"ogStore"}
      keywords={"sign up, create account, user registration"}
      description={
        "Join ogStore today by creating your account. Sign up for exclusive access to premium sneakers and the latest fashion trends."
      }
    >
      <div className="formOuterContainer flex justify-center items-center bg-authImage bg-cover bg-center h-fit p-2  -mt-6 ">
        <form
          className="formContainer bg-authImage rounded-md bg-cover bg-center  flex flex-col gap-2 justify-between h-fit w-3/4 md:w-1/2 lg:w-1/3  p-2 shadow-sm shadow-[#495057] "
          onSubmit={handleSubmit}
        >
          <h1 className="text-center p-1 text-lg font-semibold text-textOne">
            Get free Delivery With your first order
          </h1>
          <div className="flex flex-col gap-2 justify-between">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-1 rounded-sm bg-bgThree focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <label for="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-1 rounded-sm bg-bgThree focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>

          <div className="flex flex-col gap-2 justify-between">
            <label htmlFor="address">Address</label>
            <input
              type="number"
              placeholder="Enter your pincode"
              className="p-1 rounded-sm bg-bgThree focus:outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              placeholder="Enter your phone number"
              className="p-1 rounded-sm bg-bgThree focus:outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
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
              Create Account
            </button>
          </div>
          <Link
            to="/sign-in"
            className="text-center text-lg underline text-textOne hover:scale-105 duration-300"
          >
            Already Have an Account?
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
