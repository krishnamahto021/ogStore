const mongoose = require("mongoose");

const productModel = mongoose.Schema({
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
  image: {
    type: String,
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
});

const Product = mongoose.model("Product", productModel);
module.exports = Product;
