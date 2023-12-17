import React from "react";
import Layout from "../../Components/Layouts/Layout";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";
import ProductCard from "../Admin/ProductCard";

const WishList = () => {
  const { favorites } = useSelector(userSelector);
  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-2">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <ProductCard key={product._id} product={product.product} />
          ))
        ) : (
          <p>No items</p>
        )}
      </div>
    </Layout>
  );
};

export default WishList;
