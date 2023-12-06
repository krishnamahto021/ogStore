import React, { useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import ProductCard from "./Admin/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSelector,
  getInitialProducts,
} from "../Redux/Reducers/adminReducer";
import SearchResults from "../Components/SearchResults";
import { createPortal } from "react-dom";

const Home = () => {
  const { products, showSearchScreen } = useSelector(adminSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialProducts());
  }, []);
  return (
    <Layout
      title={"Premium Quality Sneakers | ogStore"}
      author={"ogStore"}
      keywords={"sneakers, high-quality sneakers, premium sneakers"}
      description={
        "Discover a wide range of premium quality sneakers at ogStore. Find the latest styles and trends in high-quality footwear."
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
      {showSearchScreen &&
        createPortal(
          <SearchResults />,
          document.querySelector(".modalContainer")
        )}
    </Layout>
  );
};

export default Home;
