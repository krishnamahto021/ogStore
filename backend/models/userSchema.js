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
    favorites: [
      {
        product: { type: mongoose.ObjectId, ref: "Product" },
      },
    ],
    role: { type: Number, default: 0 },
    reviews: [
      {
        type: mongoose.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
