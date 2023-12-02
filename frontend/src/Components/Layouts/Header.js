import React, { useState } from "react";
import { BsCart } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";

const Header = () => {
  const { loggedInUser } = useSelector(userSelector);
  const [showHam, setShowHam] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="fixed top-0 z-40">
      <div className="offerSection   flex text-2xl h-14 sm:h-7 md:text-lg w-screen items-center justify-around bg-black text-textTwo">
        <p className="text-center capitalize">
          🎁 Order above ₹2999 today and Get Free Home delivery 🎉🥳
        </p>
      </div>
      <div className="bg-bgOne h-12   sm:w-screen flex items-center justify-between text-textOne p-1 text-lg font-semibold md:text-2xl">
        <div className="logoContainer flex items-center gap-2 justify-between">
          <div className="hamburgerMenu md:hidden  ">
            <RxHamburgerMenu
              onClick={() => setShowHam(!showHam)}
              className="text-4xl cursor-pointer"
            />
          </div>
          <Link to="/" className="text-3xl md:text-4xl cursor-pointer ">
            ogStore
          </Link>
        </div>
        <div className="itemsContainer  items-center gap-6 justify-evenly hidden md:flex">
          <NavLink to="/for-him">Him</NavLink>
          <NavLink to="/for-her">Her</NavLink>
          <NavLink to="/unisex">Unisex</NavLink>
          <NavLink to="/shop-all">All</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </div>
        <div className="loginOrCartContainer">
          {
            <div className="rightContainer flex items-center gap-8 justify-around text-3xl cursor-pointer">
              <BsSearch
                onClick={() => setShowSearch(!showSearch)}
                className="duration-200"
              />
              {loggedInUser.jwtToken ? <BsCart /> : <></>}
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
          className="focus:outline-none bg-bgFour text-textThree rounded-sm p-2 w-screen"
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
        <NavLink to="/for-him">Him</NavLink>
        <NavLink to="/for-her">Her</NavLink>
        <NavLink to="/unisex">Unisex</NavLink>
        <NavLink to="/shop-all">All</NavLink>
      </div>
    </div>
  );
};

export default Header;
