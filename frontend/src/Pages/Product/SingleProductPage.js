import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layouts/Layout";
import SingleProductImageSlider from "./SingleProductImageSlider";
import {
  fetchSingleProduct,
  setBuyNow,
  setCart,
  setRedirectPath,
  toggleFavorite,
  userSelector,
} from "../../Redux/Reducers/userReducer";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiMinusCircle } from "react-icons/fi";
import { BsCartPlusFill, BsCartXFill } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import RatingStars from "../../Components/RatingStars";

const ProductPage = () => {
  const { productId } = useParams();
  const { loggedInUser, singleProduct, cartItems, favorites } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = cartItems.find(
    (item) => item.product._id === singleProduct._id
  );
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };

  const [size, setSize] = useState(!cartItem ? "" : cartItem.size);
  const [quantity, setQuantity] = useState(!cartItem ? 1 : cartItem.quantity);
  const [liked, setLiked] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // Update size and quantity when cartItem changes
    setSize(!cartItem ? "" : cartItem.size);
    setQuantity(!cartItem ? 1 : cartItem.quantity);
  }, [cartItem]);
  useEffect(() => {
    dispatch(fetchSingleProduct({ productId }));
  }, []);

  useEffect(() => {
    const isLiked = favorites.some(
      (fav) => fav.product._id === singleProduct._id
    );
    setLiked(isLiked);
  }, [favorites, singleProduct]);
  const handleChangeQuantity = (operand) => {
    const selectedSize = singleProduct.sizes.find((s) => s.size === size);
    if (operand === 1) {
      if (quantity >= selectedSize.quantity) {
        toast.error("Insufficient Stock");
        return;
      }
      setQuantity(quantity + 1);
    } else {
      if (quantity <= 1) {
        toast.error("Buy at least 1 pair of sneakers for yourself 😃");
        return;
      }
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      if (!size || quantity < 1) {
        toast.error(`Buy at least 1 pair of sneakers for yourself 😃`);
        return;
      }
      const existingCartItem = cartItems.find(
        (item) => item.product._id === singleProduct._id
      );
      if (existingCartItem) {
        const { data } = await axios.post(
          "/user/update-cart",
          { pId: singleProduct._id, size, quantity },
          config
        );
        if (data.success) {
          toast.success(`${data.message}`);
          dispatch(setCart({ product: singleProduct, size, quantity }));
        }
      } else {
        const { data } = await axios.post(
          "/user/add-to-cart",
          { pId: singleProduct._id, size, quantity },
          config
        );
        if (data.success) {
          toast.success(`${data.message}`);
          dispatch(setCart({ product: singleProduct, size, quantity }));
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(`${error.response.data.message}`);
        dispatch(setRedirectPath(location.pathname));
        navigate("/sign-in");
      } else {
        toast.error(`Sign in to Continue`);
        navigate("/sign-in");
      }
    }
  };
  const handleBuyNow = () => {
    if (!size || quantity < 1) {
      toast.error(`Select size and quantity before buying`);
      return;
    }
    const price = singleProduct.price;
    dispatch(setBuyNow({ price, quantity, product: singleProduct, size }));
    navigate("/user/order-page");
  };
  const toggleFavorites = async () => {
    try {
      const { data } = await axios.get(
        `/user/toggle-fav/${singleProduct._id}`,
        config
      );
      if (data.success) {
        dispatch(toggleFavorite(singleProduct));
        toast.success(data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Something went wrong`);
      } else {
        toast.error(`Internal server error`);
      }
    }
  };
  return (
    <Layout>
      {singleProduct.name ? (
        <div className="flex flex-col md:flex-row ">
          <div className="imageContainer relative w-full  md:w-1/2">
            <SingleProductImageSlider data={singleProduct} />
            <div
              className={`likedContainer absolute ${
                loggedInUser.role === 0 ? "block" : "hidden"
              } top-2 p-2 text-xl right-2 z-20 `}
            >
              {liked ? (
                <FaHeart
                  className="text-red-600  cursor-pointer hover:scale-90 duration-200"
                  onClick={() => toggleFavorites(singleProduct)}
                />
              ) : (
                <FaRegHeart
                  className="cursor-pointer hover:scale-125 duration-200"
                  onClick={() => toggleFavorites(singleProduct)}
                />
              )}
            </div>
          </div>
          <div className="productDetailsContainer w-full  md:w-1/2 p-4">
            <div>
              <h1 className="text-2xl font-bold">{singleProduct.name}</h1>
            </div>
            <p className="text-textOne text-base">{`₹ ${singleProduct.price}`}</p>

            <div className="flex justify-evenly gap-2  p-1 items-center flex-col">
              <p className="text-xl font-light text-textOne">
                Select your Size
              </p>
              <div className=" flex text-3xl gap-2   justify-center flex-wrap max-w-prose p-2 ">
                {size || cartItem ? (
                  <>
                    {singleProduct.sizes.map((size) => (
                      <div className="flex gap-1">
                        <button
                          key={size.size}
                          className={`inline-block ${
                            size.quantity !== 0
                              ? "text-textFour cursor-pointer "
                              : "disabled  text-red-500 cursor-not-allowed"
                          } bg-bgOne w-full h-full rounded-full px-1 py-1  font-semibold  mr-2 mb-2`}
                          onClick={() => setSize(size.size)}
                        >
                          {`${size.size}`}
                        </button>
                      </div>
                    ))}
                    <div className="w-full flex  gap-4  items-center justify-center">
                      <p>{size ? size : cartItem.size}</p>
                      <FiMinusCircle
                        className="cursor-pointer "
                        onClick={() => handleChangeQuantity(2)}
                      />
                      <p>{quantity}</p>
                      <IoAddCircleOutline
                        className="cursor-pointer "
                        onClick={() => handleChangeQuantity(1)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {!cartItem
                      ? singleProduct.sizes.map((size) => (
                          <button
                            key={size.size}
                            className={`inline-block ${
                              size.quantity !== 0
                                ? "text-textFour cursor-pointer"
                                : "disabled  text-red-500 cursor-not-allowed"
                            } bg-bgOne  rounded-full px-1 py-1  font-semibold  mr-2 mb-2`}
                            onClick={() => setSize(size.size)}
                          >
                            {`${size.size}`}
                          </button>
                        ))
                      : size}
                  </>
                )}
              </div>
            </div>
            <div className="ctaContainer flex items-center flex-row gap-1 justify-between md:flex-row pb-2 px-2">
              {!cartItem ? (
                <button
                  type="submit"
                  onClick={addToCart}
                  className="p-2 flex items-center justify-center gap-2 w-full rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
                >
                  Add to Cart <BsCartPlusFill />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={addToCart}
                  className="p-2  flex gap-2 items-center justify-center  w-full rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
                >
                  Update <BsCartXFill />
                </button>
              )}

              <Link
                to="/user/order-page"
                type="submit"
                onClick={handleBuyNow}
                className="p-2 flex items-center justify-center gap-2  w-full rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
              >
                Buy Now <AiFillThunderbolt />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>No item</p>
      )}
      <div className="reviewsSection mt-8">
        <h2 className="text-2xl font-bold mb-4 uppercase border-b-2 ">
          Customer"s Love
        </h2>
        {singleProduct.reviews && singleProduct.reviews.length !== 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {singleProduct.reviews.map((review) => (
              <div key={review._id} className="mb-4 max-w-xs">
                <RatingStars count={review.rating} />
                <p className="text-textOne ml-1">"{review.text}"</p>
                <div className="userContainer flex">
                  <p className="text-lg font-semibold">{review.user.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="flex justify-around text-3xl font-light ">No any reviews yet 🐱</p>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
