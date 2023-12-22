const {
  forgottenPasswordEmail,
} = require("../mailers/forgottenPasswordMailer");
const { verifyUserEmail } = require("../mailers/verifyUserEmail");
const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const passwordHelper = require("../utils/passwordHelper");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Order = require("../models/orderSchema");
const Review = require("../models/ratingSchema");
const dotenv = require("dotenv").config();

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
        _id: user._id,
        name: user.name,
        email,
        role: user.role,
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

module.exports.updateUser = async (req, res) => {
  try {
    const { email, password, phone, address } = req.body;
    const user = await User.findOne({ email });
    const hashedPassword = await passwordHelper.hashingPasswordFunction(
      password
    );
    if (user) {
      user.password = hashedPassword || user.password;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      await user.save();
      return res.status(200).send({
        success: true,
        message: "Updated Details successfully",
        user,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "User Not registered",
      });
    }
  } catch (error) {
    console.log(`Error in updating user`);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
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

// add to cart and updating cart based on qty
module.exports.addToCart = async (req, res) => {
  try {
    const { pId, size, quantity } = req.body;
    const product = await Product.findById(pId);
    const intSize = parseFloat(size);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    const selectedSize = product.sizes.find((s) => s.size === intSize);
    if (selectedSize.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the product is already in the cart
    const existingCartItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.product.equals(pId) && cartItem.size === intSize
    );
    if (existingCartItemIndex !== -1) {
      if (user.cart[existingCartItemIndex].quantity > selectedSize.quantity) {
        await user.save();
        return res.status(202).json({
          success: true,
          message: "Insufficient Stock",
        });
      } else {
        user.cart[existingCartItemIndex].quantity = parseFloat(quantity);
        await user.save();
        return res.status(201).json({
          success: true,
          message: "Updated Quantity",
        });
      }
    } else {
      user.cart.push({ product: pId, size, quantity });
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Product added to the cart",
      });
    }
  } catch (error) {
    console.log(`Error in adding cart items: ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.fetchCartItems = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user contains the authenticated user
    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const cartItems = user.cart.map((cartItem) => ({
      product: {
        _id: cartItem.product._id,
        name: cartItem.product.name,
        images: cartItem.product.images,
        price: cartItem.product.price,
        sizes: cartItem.product.sizes, // Include sizes in the response
        // Add other product details as needed
      },
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));

    return res.status(200).json({
      success: true,
      cartItems: cartItems,
    });
  } catch (error) {
    console.error(`Error in fetching cart items: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.updateCart = async (req, res) => {
  try {
    const { pId, size, quantity } = req.body;
    const product = await Product.findById(pId);
    const intSize = parseFloat(size);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    const selectedSize = product.sizes.find((s) => s.size === intSize);
    if (selectedSize.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the product is already in the cart
    const existingCartItemIndex = user.cart.findIndex((cartItem) =>
      cartItem.product.equals(pId)
    );
    user.cart[existingCartItemIndex].quantity = parseFloat(quantity);
    user.cart[existingCartItemIndex].size = parseFloat(size);
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Updated Quantity",
    });
  } catch (error) {
    console.log(`Error in adding cart items: ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.getOrdersForUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ buyer: userId }).sort({ createdAt: -1 });

    const populatedOrders = [];

    for (const order of orders) {
      const populatedOrder = {
        _id: order._id,
        payment: order.payment.amount,
        buyer: order.buyer,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        products: [],
      };

      for (const productInfo of order.products) {
        const productId = productInfo.product;

        // Fetch product details
        const product = await Product.findById(productId);

        // Fetch reviews for the product within the specific order
        const productWithOrderReviews = await Product.populate(product, {
          path: "reviews",
          match: { order: order._id }, // Filter reviews based on order ID
        });

        const populatedProduct = {
          quantity: productInfo.quantity,
          size: productInfo.size,
          amount: product.price * productInfo.quantity,
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            reviews: productWithOrderReviews.reviews,
          },
        };

        populatedOrder.products.push(populatedProduct);
      }

      populatedOrders.push(populatedOrder);
    }

    res.status(200).json({
      success: true,
      orders: populatedOrders,
    });
  } catch (error) {
    console.log(`Error fetching user orders: ${error}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//check the authentication of the admin
module.exports.checkAuth = async (req, res) => {
  return res.status(200).send({
    message: "Hello Admin",
  });
};

// give api key for frontend
module.exports.sendApiKeys = async (req, res) => {
  const apiKeys = {
    REACT_APP_ALGOLIA_API_ID: process.env.REACT_APP_ALGOLIA_API_ID,
    REACT_APP_ALGOLIA_API_KEY: process.env.REACT_APP_ALGOLIA_API_KEY,
    REACT_APP_ALGOLIA_INDEX_NAME: process.env.REACT_APP_ALGOLIA_INDEX_NAME,
    RAZORPAY_API_KEY: process.env.RAZORPAY_API_KEY,
  };
  return res.status(200).json({
    message: "Api key",
    apiKeys,
  });
};

// toggle fav
module.exports.toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;
    const existingFav = user.favorites.find(
      (fav) => fav.product.toString() === productId
    );

    if (existingFav) {
      user.favorites = user.favorites.filter(
        (fav) => fav.product.toString() !== productId
      );
      await user.save();
      res.status(200).send({
        success: true,
        message: "Product removed from favorites",
      });
    } else {
      user.favorites.push({ product: productId });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Product added to favorites",
      });
    }
  } catch (error) {
    console.log(`error in toggling fav ${error}`);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.fetchFavorite = async (req, res) => {
  const userId = req.user._id; // Assuming req.user contains the authenticated user

  try {
    const user = await User.findById(userId).populate("favorites.product");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send({
      success: true,
      message: "Fetched favorite items",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create controller for the rating feature
module.exports.createReview = async (req, res) => {
  try {
    const { text, rating, orderId } = req.body;
    const productId = req.params.productId;
    const userId = req.user._id;
    const hasBoughtProduct = await Order.exists({
      _id: orderId,
      buyer: userId,
      "products.product": productId,
      status: "Delivered",
    });
    if (!hasBoughtProduct) {
      return res.status(400).send({
        success: false,
        message: "You can only review products you bought",
      });
    }
    const review = await Review.create({
      user: userId,
      product: productId,
      order: orderId,
      text,
      rating,
    });
    const product = await Product.findById(productId);
    product.totalRating += rating;
    product.numReviews += 1;
    product.averageRating = Math.round(
      product.totalRating / product.numReviews
    );
    product.reviews.push(review._id);
    await product.save();
    const user = await User.findById(userId);
    user.reviews.push(review._id);
    await user.save();

    return res
      .status(200)
      .send({ success: true, message: "Thanks for your feedback", review });
  } catch (error) {
    console.log(`Error in creating rating ${error}`);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};
