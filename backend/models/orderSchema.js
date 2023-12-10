const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [{ type: mongoose.ObjectId, ref: "Product" }],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "New",
      enum: ["Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
