import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSelector } from "../../Redux/Reducers/userReducer";
import RatingStars from "../../Components/RatingStars";

const Rating = ({ product, order }) => {
  const { loggedInUser } = useSelector(userSelector);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const hasReviewed = product.reviews.find(
    (review) =>
      review.product === product._id && review.user === loggedInUser._id
  );
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };
  const handleRateReview = async () => {
    try {
      const orderId = order._id;
      if (!text) {
        toast.error(`Write about your experience`);
        return;
      }
      const { data } = await axios.post(
        `/user/rating/${product._id}`,
        { text, rating, orderId },
        config
      );
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error(`Internal Server Error`);
      }
    }
  };

  return hasReviewed ? (
    <div className="m-2">
      <RatingStars count={hasReviewed.rating} />
    </div>
  ) : (
    <div>
      <div className="reviewProduct flex gap-2 items-center justify-between flex-col md:flex-row">
        <div className="flex flex-col gap-2 justify-between">
          <label htmlFor="text">Share Your Experience – Review Us! 🌟</label>
          <input
            type="text"
            placeholder="Give your feedback"
            className="p-1 rounded-sm w-full bg-bgThree focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></input>
        </div>
        <div className="starsContainer flex items-center gap-4 ">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const StarIcon =
                star <= rating
                  ? star - rating === 0.5
                    ? FaStarHalfAlt
                    : FaStar
                  : FaRegStar;

              return (
                <StarIcon
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-orange-500 cursor-pointer hover:scale-105 duration-200"
                />
              );
            })}
          </div>
          <div className="flex justify-around ">
            <button
              type="submit"
              onClick={handleRateReview}
              className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgThree hover:text-textOne duration-300"
            >
              Rate us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
