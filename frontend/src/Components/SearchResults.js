import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSelector,
  setShowSearchScreen,
} from "../Redux/Reducers/adminReducer";
import ProductCard from "../Pages/Admin/ProductCard";

const SearchResults = () => {
  const { searchResults } = useSelector(adminSelector);
  const dispatch = useDispatch();
  function handleShowSearchScreen() {
    dispatch(setShowSearchScreen());
  }
  return (
    <>
      <div
        className="modalWrapper fixed top-0 left-0 right-0  bg-[rgba(0,0,0,0.7)]  h-screen z-50 "
        onClick={handleShowSearchScreen}
      ></div>
      <div className="resultContainer flex p-2  items-center justify-center w-fit h-full text-textOne absolute top-[10vh]">
        <p
          className="text-center text-red-700 hover:scale-110 duration-150 text-4xl font-bold cursor-pointer fixed right-0 top-0 p-2 z-50 "
          onClick={handleShowSearchScreen}
        >
          X
        </p>
        {searchResults?.length > 0 ? (
          <div className="max-w-screen m-auto grid  gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 z-50 p-2">
            {searchResults?.map((p) => (
              <ProductCard product={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-red-600 text-xl block m-auto px-5 z-50">
            No search results .... try typing full name
          </p>
        )}
      </div>
    </>
  );
};

export default SearchResults;
