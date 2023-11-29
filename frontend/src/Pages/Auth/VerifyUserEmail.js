import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const VerifyUserEmail = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  async function verifyUserEmail(token) {
    try {
      const data = await axios.get(`/user/verify-user/${token}`);
      if (data.success) {
        console.log(data.success);
        toast.success(`${data.message}`);
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000); // Redirect to login page after 3 seconds
      }
    } catch (error) {
      if (error.response) {
        toast.error(`${error.response.data.message}`);
        navigate("/sign-up");
      } else {
        toast.error(`Internal Server Error`);
        navigate("/sign-up");
      }
    }
  }

  useEffect(() => {
    const token = window.location.pathname.split("/").pop();
    verifyUserEmail(token);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    if (count === 0) {
      toast.success(`Email verified Sucessfully`);
    }
    count === 0 && navigate("/sign-in");

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bgTwo text-textThree ">
      <div>{`Redirecting you to the Login Page in ${count} seconds`}</div>
      <ClipLoader />
    </div>
  );
};

export default VerifyUserEmail;
