const User = require("../models/userSchema");
const passwordHelper = require("../utils/passwordHelper");
const crypto = require("crypto");

module.exports.signUp = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.send({ error: "Please fill all the details" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).send({
        success: true,
        message: "User already exists",
      });
    }
    const hashedPassword = await passwordHelper.hashingPasswordFunction(
      password
    );
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      token: crypto.randomBytes(16).toString("hex"),
    });
    return res.status(201).send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in signing up the user",
      error,
    });
  }
};
