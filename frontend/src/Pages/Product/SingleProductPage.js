import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import SliderComponent from "../../Components/Slider";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleProduct,
  userSelector,
} from "../../Redux/Reducers/userReducer";

const ProductPage = () => {
  const { productId } = useParams();
  const { loggedInUser, singleProduct } = useSelector(userSelector);
  const dispatch = useDispatch();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };
  useEffect(() => {
    if (loggedInUser.jwtToken) {
      dispatch(fetchSingleProduct({ config, productId }));
    }
  }, []);

  return (
    <Layout>
      {singleProduct.name ? (
        <div className="flex flex-col ">
          <div className="w-1/2 ">
            
          </div>
          <div>{singleProduct.name}</div>
        </div>
      ) : (
        <p>no item</p>
      )}
      {singleProduct.name}
    </Layout>
  );
};

export default ProductPage;
