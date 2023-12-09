import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, userSelector } from "../../Redux/Reducers/userReducer";
import Layout from "../../Components/Layouts/Layout";
import ProductCard from "../Admin/ProductCard";

const CartPage = () => {
  const { cartItems, loggedInUser } = useSelector(userSelector);
  const dispatch = useDispatch();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };
  useEffect(() => {
    if (loggedInUser.jwtToken) {
      dispatch(fetchCartItems(config));
    }
  }, [loggedInUser]);
  return (
    <Layout>
      {cartItems.length > 0 ? (
        <div className="grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cartItems.map((cp) => (
            <div>
              <ProductCard product={cp.product} />
            </div>
          ))}
        </div>
      ) : (
        <div>No any items yet 😿 </div>
      )}
    </Layout>
  );
};

export default CartPage;
