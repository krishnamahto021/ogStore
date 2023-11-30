const {
  forgottenPasswordEmail,
} = require("../mailers/forgottenPasswordMailer");
const { verifyUserEmail } = require("../mailers/verifyUserEmail");
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
    verifyUserEmail(newUser);
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
      return res.status(402).send({
        success: false,
        message: "Invalid Email",
      });
    }
    if (!user.isVerified) {
      return res.status(401).send({
        success: false,
        message: "Please Verify your Email",
      });
    }
    const matchPassword = await passwordHelper.compareHashedPasswordFunction(
      password,
      user.password
    );

    if (!matchPassword) {
      return res.status(401).send({
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
        jwtToken,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in logging In",
      error,
    });
  }
};

module.exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).send({
        message: "Token not valid",
        success: false,
      });
    }
    user.isVerified = true;
    user.token = crypto.randomBytes(16).toString("hex");
    await user.save();
    console.log(user);

    return res.status(200).send({
      success: true,
      message: "Verified Successfully",
    });
  } catch (error) {
    console.log(`Error in the verification of user ${error}`);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// to send mail to the user after he clicks the submit the forgotten password form
module.exports.forgottenPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      //send mail
      forgottenPasswordEmail(user);
      return res.status(200).send({
        success: true,
        message: "Check your mail to update password",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Email not Registered",
      });
    }
  } catch (error) {
    console.log(`Error in sending forgotten password email ${error}`);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports.updatePassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).send({
      message: "Invalid Token",
      success: false,
    });
  } else {
    const hashedPassword = await passwordHelper.hashingPasswordFunction(
      password
    );
    user.password = hashedPassword;
    user.token = crypto.randomBytes(16).toString("hex");
    await user.save();
    return res.status(200).send({
      success: true,
      message: "Password updated Successfully",
    });
  }
};

//check the authentication of the admin
module.exports.checkAuth = async (req, res) => {
  return res.status(200).send({
    message: "Hello Admin",
  });
};
