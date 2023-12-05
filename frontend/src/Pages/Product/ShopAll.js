import React, { useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSelector,
  getInitialProducts,
} from "../../Redux/Reducers/adminReducer";
import ProductCard from "../Admin/ProductCard";

const ShopAll = () => {
  const { products } = useSelector(adminSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialProducts());
  }, []);
  return (
    <Layout
      title={"Shop All Collection | ogStore"}
      author={"ogStore"}
      keywords={
        "premium shoes for everyone, versatile footwear, stylish sneakers for all"
      }
      description={
        "Browse our Shop All Collection at ogStore, featuring high-quality and stylish footwear for everyone. Explore versatile sneakers suitable for all styles and preferences."
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-2">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No Products</p>
        )}
      </div>
    </Layout>
  );
};

export default ShopAll;
