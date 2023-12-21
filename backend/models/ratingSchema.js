const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.ObjectId,
      ref: "Product",
      required: true,
    },
    order: {
      type: mongoose.ObjectId,
      ref: "Order",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
