import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, userSelector } from "../../Redux/Reducers/userReducer";
import Layout from "../../Components/Layouts/Layout";
import ProductCard from "../Admin/ProductCard";
import { Link } from "react-router-dom";

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
        <>
          <div className="flex flex-col md:flex-row">
            <div className="grid gap-2 w-full md:w-4/5 md:gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cartItems.map((cp) => (
                <div key={cp.product.id}>
                  {/* Make sure to provide a unique key for each mapped item */}
                  <ProductCard product={cp.product} />
                </div>
              ))}
            </div>
            <div className="addressContainer w-1/5">
              <div className="flex justify-around mt-5">
                <Link
                  to="/user/order-page"
                  type="submit"
                  className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgThree hover:text-textOne duration-300"
                >
                  Shop All
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No any items yet 😿 </div>
      )}
    </Layout>
  );
};

export default CartPage;
