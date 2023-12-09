const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    isVerified: { type: Boolean, default: false },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: {},
      requied: true,
    },
    cart: [
      {
        product: { type: mongoose.ObjectId, ref: "Product" },
        quantity: { type: Number },
        size: { type: Number },
      },
    ],
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);
module.exports = User;
