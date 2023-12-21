import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminSideBar from "./AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { adminSelector, getOrders } from "../../Redux/Reducers/adminReducer";
import { userSelector } from "../../Redux/Reducers/userReducer";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { toast } from "react-toastify";
import axios from "axios";

const AllOrders = () => {
  const { loggedInUser } = useSelector(userSelector);
  const { orders } = useSelector(adminSelector);
  const dispatch = useDispatch();
  const [status, setStatus] = useState([
    "New",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [newStatus, setNewStatus] = useState("");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };
  const handleUpdateStatus = async (orderId) => {
    try {
      const { data } = await axios.post(
        `/admin/update-order-status/${orderId}`,
        { newStatus: newStatus },
        config
      );
      if (data.success) {
        toast.success(`Order status changeed to ${newStatus}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Soemthing Went wrong`);
    }
  };
  useEffect(() => {
    dispatch(getOrders(config));
  }, []);
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <AdminSideBar />
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
                    <span>₹{product.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <p className="text-lg font-semibold">
                  Total Amount: ₹{order.payment.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center ">
                <Select
                  bordered={false}
                  defaultValue={order?.status}
                  onChange={(value) => setNewStatus(value)}
                >
                  {status.map((s, i) => (
                    <Option key={i} value={s}>
                      {s}
                    </Option>
                  ))}
                </Select>
                <div
                  className="flex justify-around p-1 gap-2 "
                  onClick={() => handleUpdateStatus(order._id)}
                >
                  <button
                    type="submit"
                    className="p-1 rounded-md bg-bgTwo text-textThree hover:bg-bgThree hover:text-textOne duration-300"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default AllOrders;
