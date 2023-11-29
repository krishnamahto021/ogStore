import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const VerifyUserEmail = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  let verifyUserCalled = false; // Flag to track if verifyUser is already called

  const verifyUser = async (token) => {
    if (!verifyUserCalled) {
      verifyUserCalled = true;
      try {
        const { data } = await axios.get(`/user/verify-user/${token}`);
        toast.success(data.message);
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Internal Server Error");
        }
        navigate("/sign-up");
      }
    }
  };

  useEffect(() => {
    const token = window.location.pathname.split("/").pop();
    verifyUser(token); // Only call verifyUser once
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      if (count === 0) {
        navigate("/sign-in");
      }
    };
  }, [count, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bgTwo text-textThree ">
      <div>{`Redirecting you to the Login Page in ${count} seconds`}</div>
      <ClipLoader />
    </div>
  );
};

export default VerifyUserEmail;
