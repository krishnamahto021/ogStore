const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.ObjectId, ref: "Product" },
        quantity: { type: Number },
        size: { type: Number },
      },
    ],
    payment: {
      amount: { type: Number },
      razorpay_order_id: { type: String },
      razorpay_payment_id: { type: String },
      status: { type: String },
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "New",
      enum: ["New", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
