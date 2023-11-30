import React from "react";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <nav className="w-1/3 p-2  md:w-1/4 bg-bgThree text-textOne md:p-4 rounded-md">
      <NavLink to="/admin/orders" className=" hover:bg-bgOne py-2 px-3 block">
        Orders
      </NavLink>
      <NavLink
        to="/admin/categories"
        className=" hover:bg-bgOne py-2 px-3 block"
      >
        Categories
      </NavLink>
      <NavLink
        to="/admin/add-product"
        className=" hover:bg-bgOne py-2 px-3 block"
      >
        Add Product
      </NavLink>
    </nav>
  );
};

export default AdminSideBar;
