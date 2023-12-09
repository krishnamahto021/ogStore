import React, { useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSelector,
  getInitialProducts,
} from "../Redux/Reducers/adminReducer";
import SearchResults from "../Components/SearchResults";
import { createPortal } from "react-dom";
import HomeSlider from "../Components/HomeSlider";
import {
  authorizeUser,
  fetchCartItems,
  userSelector,
} from "../Redux/Reducers/userReducer";

const Home = () => {
  const { products, showSearchScreen } = useSelector(adminSelector);
  const { loggedInUser } = useSelector(userSelector);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authorizeUser());
    dispatch(getInitialProducts());
  }, []);

  useEffect(() => {
    if (loggedInUser.jwtToken) {
      dispatch(fetchCartItems(config));
    }
  }, [loggedInUser]);
  const getFirst10Products = () => {
    return products
      .slice()
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(0, 10); // Get the first 10 items
  };

  const first10Products = getFirst10Products();
  return (
    <Layout
      title={"Premium Quality Sneakers | ogStore"}
      author={"ogStore"}
      keywords={"sneakers, high-quality sneakers, premium sneakers"}
      description={
        "Discover a wide range of premium quality sneakers at ogStore. Find the latest styles and trends in high-quality footwear."
      }
    >
      <div className="flex flex-col gap-2 ">
        <div className="latestRelease">
          <div className="font-extrabold text-xl">Latest Drops !!</div>
          <HomeSlider data={first10Products} />
        </div>
        <div className="everGreen">
          <div className="font-extrabold text-xl">All time Favorites 😻 </div>
          <HomeSlider data={first10Products} />
        </div>
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
