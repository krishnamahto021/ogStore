import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const clearInputs = () => {
    setEmail("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/user/forgotten-password", {
        email,
      });
      if (response.status === 200) {
        toast.success("Password reset Link Sent");
      } else {
        toast.error(response.data.message || "An error occurred");
      }
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a non-2xx status code
        //  console.error("Server error:", error.response.data);
        toast.error(error.response.data.message || "Internal Server Error");
        navigate("/sign-in");
      }
    }

    clearInputs();
  };
  return (
    <Layout
      title={"Forgotten Password | ogStore"}
      author={"ogStore"}
      keywords={"sign in, log in, user authentication"}
      description={
        "Log in to your ogStore account. Access your saved items, track your orders, and stay updated on the latest releases of premium sneakers."
      }
    >
      <div className="formOuterContainer flex justify-center items-center bg-authImage bg-cover bg-center h-[85vh]  -mt-6 ">
        <form
          className="formContainer backdrop-blur-sm rounded-md bg-cover bg-center  flex flex-col gap-2 justify-between h-fit w-3/4 md:w-1/2 lg:w-1/3  p-2 shadow-sm shadow-[#495057] "
          onSubmit={handleSubmit}
        >
          <h1 className="text-center p-1 text-lg font-semibold text-textOne">
            Reset your Password
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
            ></input>
          </div>

          <div className="flex justify-around mt-5">
            <button
              type="submit"
              className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgThree hover:text-textOne duration-300"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgottenPassword;
