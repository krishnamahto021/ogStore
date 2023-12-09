import React from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../Redux/Reducers/userReducer";
import { NavLink } from "react-router-dom";

const UserSideBar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="w-full p-2  flex flex-col gap-1 md:w-1/4 bg-bgThree text-textOne md:p-4 rounded-md">
      <NavLink to="/user/orders" className=" hover:bg-bgOne py-2 px-3 block">
        Orders
      </NavLink>
      <button
        className="p-2 rounded-md block m-auto bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
        onClick={() => dispatch(logOutUser())}
      >
        Log out
      </button>
    </nav>
  );
};

export default UserSideBar;
