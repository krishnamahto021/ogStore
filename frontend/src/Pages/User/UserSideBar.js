import React from "react";
import { NavLink } from "react-router-dom";

const UserSideBar = () => {
  return (
    <>
      <nav className="w-full p-2  grid grid-cols-2 md:grid-cols-4  gap-1    text-textOne  rounded-md">
        <NavLink
          to="/user/orders"
          className=" hover:bg-bgOne bg-bgThree rounded-lg py-2 px-3 "
        >
          Orders
        </NavLink>
        <NavLink
          to="/user/update-details"
          className=" hover:bg-bgOne bg-bgThree rounded-lg py-2 px-3"
        >
          Update Delivery Address
        </NavLink>
        <NavLink
          to="/user/wishlist"
          className=" hover:bg-bgOne bg-bgThree rounded-lg py-2 px-3"
        >
          Wishlist
        </NavLink>
        <NavLink
          to="/user/rewards"
          className=" hover:bg-bgOne bg-bgThree rounded-lg py-2 px-3"
        >
          Rewards
        </NavLink>
      </nav>
    </>
  );
};

export default UserSideBar;
