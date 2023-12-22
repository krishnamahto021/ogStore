import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const RatingStars = ({ count }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const StarIcon =
        i <= count ? (i - count === 0.5 ? FaStarHalfAlt : FaStar) : FaRegStar;
      stars.push(
        <StarIcon
          key={i}
          className="text-orange-500  hover:scale-105 duration-200"
        />
      );
    }
    return stars;
  };

  return <div className="flex gap-1">{renderStars()}</div>;
};

export default RatingStars;
