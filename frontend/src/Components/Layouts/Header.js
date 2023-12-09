import React, { useState } from "react";
import { BsCart } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";
import {
  adminSelector,
  setSearchProduct,
  setShowSearchScreen,
} from "../../Redux/Reducers/adminReducer";
import { searchProduct } from "../../Api/agolia";

const Header = () => {
  const { loggedInUser, cartItems } = useSelector(userSelector);
  const { categories } = useSelector(adminSelector);
  const [showHam, setShowHam] = useState(true);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const handleSearch = async () => {
    try {
      const results = await searchProduct(query);
      dispatch(setSearchProduct(results));
      dispatch(setShowSearchScreen());
      setQuery("");
      setShowSearch(!showSearch);
    } catch (error) {
      console.log(`Error in searching products ${error}`);
    }
  };
  return (
    <div className="fixed top-0 z-40">
      <div className="offerSection   flex text-2xl h-14 sm:h-7 md:text-lg w-screen items-center justify-around bg-black text-textTwo">
        <p className="text-center capitalize">
          🎁 Order above ₹2999 today and Get Free Home delivery 🎉🥳
        </p>
      </div>
      <div className="bg-bgOne h-12   sm:w-screen flex items-center justify-between text-textOne p-1 text-lg font-semibold md:text-2xl">
        <div className="logoContainer flex items-center gap-2 justify-between">
          <div className="hamburgerMenu md:hidden p-1 ">
            <RxHamburgerMenu
              onClick={() => setShowHam(!showHam)}
              className="text-4xl cursor-pointer"
            />
          </div>
          <Link to="/" className="text-3xl md:text-4xl p-1 cursor-pointer ">
            ogStore
          </Link>
        </div>
        <div className="itemsContainer  items-center gap-6 justify-evenly hidden md:flex">
          {categories.map((c) => (
            <NavLink to={`/${c.slug}/${c._id}`}>{c.name}</NavLink>
          ))}
          <NavLink to="/shop-all">All</NavLink>
          {loggedInUser.role === 1 ? (
            <NavLink to="/admin">Admin</NavLink>
          ) : null}
        </div>
        <div className="loginOrCartContainer">
          {
            <div className="rightContainer flex items-center gap-8 justify-around text-3xl cursor-pointer">
              <BsSearch
                onClick={() => setShowSearch(!showSearch)}
                className="duration-200"
              />
              {loggedInUser.jwtToken ? (
                <Link to="/user/cart" className="relative">
                  <BsCart />
                  <div className="absolute -top-[40%] left-0 right-0 text-lg text-textOne font-light m-1 p-2">{cartItems?.length}</div>
                </Link>
              ) : (
                <></>
              )}
              <Link to={loggedInUser.jwtToken ? "/user/profile" : "/sign-in"}>
                <CiUser className="mr-4" />
              </Link>
            </div>
          }
        </div>
      </div>
      <div
        className={`searchContainer opacity-0 max-h-0 overflow-hidden duration-300 ${
          showSearch ? "opacity-100 max-h-full " : ""
        }`}
      >
        <input
          placeholder="Search your kick...."
          required
          className="relative focus:outline-none bg-bgFour text-textThree rounded-sm p-2 w-screen"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <BsSearch
          className="duration-200 text-2xl absolute right-6 top-[7rem] sm:top-20 cursor-pointer m-1 "
          onClick={handleSearch}
        />
      </div>
      <div
        className={`mobileViewContainer flex flex-col items-center justify-center fixed gap-12 text-4xl ${
          !showHam ? "left-0 duration-500" : "-left-[50rem] duration-500"
        } w-screen h-full bg-bgOne top-0 md:hidden`}
      >
        {!showHam ? (
          <div className="fixed right-0 top-0 p-2">
            <RxCross1
              onClick={() => setShowHam(!showHam)}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <></>
        )}
        {categories.map((c) => (
          <NavLink to={`/${c.slug}/${c._id}`}>{c.name}</NavLink>
        ))}
        <NavLink to="/shop-all">All</NavLink>
        {loggedInUser.role === 1 ? <NavLink to="/admin">Admin</NavLink> : null}
      </div>
    </div>
  );
};

export default Header;
