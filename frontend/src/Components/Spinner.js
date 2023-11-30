import ClipLoader from "react-spinners/ClipLoader";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRedirectPath, userSelector } from "../Redux/Reducers/userReducer";

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const { redirectPath } = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!redirectPath) {
      dispatch(setRedirectPath(location.pathname));
    }
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/sign-in");
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>{`Redirecting you to the Login Page in ${count} seconds`}</div>
      <ClipLoader />
    </div>
  );
};

export default Spinner;
