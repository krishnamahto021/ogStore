import React from "react";
import Layout from "../Components/Layouts/Layout";
import ShopAll from "./Product/ShopAll";

const Home = () => {
  return (
    <Layout
      title={"Premium Quality Sneakers | ogStore"}
      author={"ogStore"}
      keywords={"sneakers, high-quality sneakers, premium sneakers"}
      description={
        "Discover a wide range of premium quality sneakers at ogStore. Find the latest styles and trends in high-quality footwear."
      }
    >
      <div className="-mt-56 sm:-mt-40">
        <ShopAll />
      </div>
    </Layout>
  );
};

export default Home;
