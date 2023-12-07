import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";

const CartPage = () => {
  const { cart } = useSelector(userSelector);
  return <div>{cart}</div>;
};

export default CartPage;
