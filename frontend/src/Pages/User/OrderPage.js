import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../Assets/images/logo.png";
import { FaLocationDot } from "react-icons/fa6";

const OrderPage = () => {
  const { cartItems, loggedInUser } = useSelector(userSelector);

  const [totalAmount, setTotalAmount] = useState(0);
  const { buyNow } = useSelector(userSelector);
  const { product, quantity, size } = buyNow;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };

  useEffect(() => {
    let calculatedTotalAmount = 0;

    // Recalculate the total amount based on whether buyNow is defined
    if (product) {
      calculatedTotalAmount = product.price * quantity;
    } else {
      cartItems?.forEach((item) => {
        calculatedTotalAmount += item.product.price * item.quantity;
      });
    }

    setTotalAmount(calculatedTotalAmount);
  }, [cartItems, buyNow]);

  const checkoutHandler = async () => {
    const {
      data: { apiKeys },
    } = await axios.get("/user/get-keys");
    const products = Object.keys(buyNow).length === 0 ? cartItems : buyNow;
    const { data } = await axios.post(
      "/user/checkout",
      { totalAmount, products },
      config
    );
    const options = {
      key: apiKeys.RAZORPAY_API_KEY,
      amount: data.order.amount,
      currency: "INR",
      name: "ogStore",
      description: "Payement processing",
      image: logo,
      order_id: data.order.id,
      callback_url: "/user/payment-verification",
      prefill: {
        name: loggedInUser.name,
        email: loggedInUser.email,
        contact: loggedInUser.phone,
      },
      notes: {
        address: "Bangalore",
      },
      theme: {
        color: "#A2D2FF",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto mt-10 relative">
        <div className=" absolute -top-16 right-0 flex items-center gap-2 justify-center">
          <FaLocationDot />
          <p>{loggedInUser.address}</p>
        </div>
        {product ? (
          // Render single item bill
          <>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img
                  src={product.images[0]} // Replace 'image' with the actual property name for the image in your product object
                  alt={product.name}
                  className="w-12 h-12 object-cover mr-4"
                />
                <div>
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-gray-600">{product.price}</p>
                  <p className="text-gray-600">{size}</p>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">Quantity: {quantity}</p>
                <p className="text-gray-600">
                  Subtotal: {product.price * quantity}
                </p>
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-300 py-4">
              <p className="text-lg font-semibold">Total Amount</p>
              <p className="text-lg font-bold">{product.price * quantity}</p>
            </div>
            <div className="flex justify-around">
              <button
                type="submit"
                onClick={checkoutHandler}
                className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgThree hover:text-textOne duration-300"
              >
                Make Payment
              </button>
            </div>
          </>
        ) : cartItems.length > 0 ? (
          // Render cart items bill
          <>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="border-b border-gray-300 mb-4 pb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <img
                      src={item.product.images[0]} // Replace 'image' with the actual property name for the image in your product object
                      alt={item.product.name}
                      className="w-12 h-12 object-cover mr-4"
                    />
                    <div>
                      <p className="text-lg font-semibold">
                        {item.product.name}
                      </p>
                      <p className="text-gray-600">{item.product.price}</p>
                      <p className="text-gray-600">{item.size}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-600">
                      Subtotal: {item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-around">
              <button
                type="submit"
                onClick={checkoutHandler}
                className="p-2 capitalize rounded-md bg-bgTwo text-textThree hover:bg-bgThree hover:text-textOne duration-300"
              >
                Pay <span className="font-semibold ml-3 ">{totalAmount}</span>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-lg font-semibold flex flex-col">
            <p>Your order information is not available.</p>
            <Link
              to="/"
              className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgThree hover:text-textOne duration-300 mt-4"
            >
              Go back to shopping.
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderPage;
