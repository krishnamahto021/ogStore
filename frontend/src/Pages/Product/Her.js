import React, { useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  adminSelector,
  getInitialProductsByCategories,
} from "../../Redux/Reducers/adminReducer";
import ProductCard from "../Admin/ProductCard";
import { createPortal } from "react-dom";
import SearchResults from "../../Components/SearchResults";

const Her = () => {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { productsByCategory, showSearchScreen } = useSelector(adminSelector);
  useEffect(() => {
    dispatch(getInitialProductsByCategories(cid));
  }, []);
  return (
    <Layout
      title={"For Her Collection | ogStore"}
      author={"ogStore"}
      keywords={
        "premium women's shoes, stylish footwear for her, women's sneakers"
      }
      description={
        "Indulge in our For Her Collection at ogStore, showcasing high-quality and stylish footwear exclusively designed for women. Discover the latest trends in premium women's sneakers for any fashion preference."
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-2">
        {productsByCategory.length > 0 ? (
          productsByCategory.map((product) => (
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

export default Her;
