const { use } = require("passport");
const User = require("../models/userSchema");
const passwordHelper = require("../utils/passwordHelper");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email or password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid Email",
      });
    }
    const matchPassword = await passwordHelper.compareHashedPasswordFunction(
      password,
      user.password
    );

    if (!matchPassword) {
      return res.status(402).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const jwtToken = await jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });
    return res.status(200).send({
      success: true,
      message: "Logged In successfull",
      user: {
        name: user.name,
        email,
        address: user.address,
        phone: user.phone,
      },
      jwtToken,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in logging In",
      error,
    });
  }
};
