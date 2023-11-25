const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    isVerified: { type: Boolean, default: true },
    phone: {
      type: Number,
      requied: true,
    },
    address: {
      type: String,
      requied: true,
    },
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);
module.exports = User;
