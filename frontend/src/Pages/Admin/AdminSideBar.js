import React from "react";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <nav className="w-full p-2   grid grid-cols-3 gap-2 h-1/4 text-textOne md:p-4 rounded-md">
      <NavLink
        to="/admin/orders"
        className=" hover:bg-bgOne bg-bgThree rounded-lg py-2 px-3 "
      >
        Orders
      </NavLink>
      <NavLink
        to="/admin/categories"
        className=" hover:bg-bgOne bg-bgThree rounded-lg py-2 px-3"
      >
        Categories
      </NavLink>
      <NavLink
        to="/admin/add-product"
        className=" hover:bg-bgOne bg-bgThree rounded-lg py-2 px-3"
      >
        Add Product
      </NavLink>
    </nav>
  );
};

export default AdminSideBar;
