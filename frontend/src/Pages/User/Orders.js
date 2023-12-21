import React, { useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import UserSideBar from "./UserSideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, userSelector } from "../../Redux/Reducers/userReducer";
import Rating from "./Rating";

const Orders = () => {
  const { loggedInUser, orders } = useSelector(userSelector);
  const dispatch = useDispatch();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };

  useEffect(() => {
    if (loggedInUser.jwtToken) {
      dispatch(fetchOrders(config));
    }
  }, [loggedInUser, orders]);
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <UserSideBar />
        <div className="allOrders w-full w-flex flex-col p-8">
          <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
          {orders.map((order) => (
            <div key={order._id} className="border p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold">
                  Order ID: {order._id}
                </span>
                <span className="text-gray-600">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <ul>
                {order.products.map((product) => (
                  <div key={product.product._id}>
                    <li
                      key={product.product._id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <img
                          src={product.product.image}
                          alt={product.product.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <h2 className="text-lg font-semibold">
                            {product.product.name}
                          </h2>
                          <p>Quantity: {product.quantity}</p>
                          <p>Size: {product.size}</p>
                        </div>
                      </div>
                      <span>₹ {product.amount.toFixed(2)}</span>
                    </li>
                    {order.status === "Delivered" ? (
                      <Rating product={product.product} order={order} />
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </ul>
              <div className="mt-2">
                <p className="text-lg font-semibold">
                  Total Amount: ₹{order.payment.toFixed(2)}
                </p>
                <p className="text-lg text-gray-400 font-semibold">
                  <span className="text-textOne mr-2">Status:</span>
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
