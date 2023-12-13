const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    isVerified: { type: Boolean, default: false },
    phone: { type: Number, required: true },
    address: { type: {}, required: true },
    cart: [
      {
        product: { type: mongoose.ObjectId, ref: "Product" },
        quantity: { type: Number },
        size: { type: Number },
      },
    ],
    orders: [
      {
        status: { type: String, default: "Pending" },
        products: [
          {
            product: { type: mongoose.ObjectId, ref: "Product" },
            quantity: { type: Number },
            size: { type: Number },
          },
        ],
        payment: {
          razorpay_order_id: { type: String },
          razorpay_payment_id: { type: String },
          status: { type: String, default: "Pending" },
        },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
