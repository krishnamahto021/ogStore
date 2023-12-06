const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    sizes: [
      {
        size: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    shipping: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productModel);
module.exports = Product;
