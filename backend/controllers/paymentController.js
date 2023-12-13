const instance = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/orderSchema");

module.exports.checkout = async (req, res) => {
  try {
    const { totalAmount, products } = req.body;
    const options = {
      amount: Number(totalAmount * 100),
      currency: "INR",
    };
    const order = await instance.instance.orders.create(options);

    // Create a new order in the database using Order.create
    const newOrder = await Order.create({
      products: Array.isArray(products)
        ? products.map((product) => ({
            product: product.productId,
            quantity: product.quantity,
            size: product.size,
          }))
        : [
            {
              product: products.productId,
              quantity: products.quantity,
              size: products.size,
            },
          ],
      payment: {
        razorpay_order_id: order.id,
        status: "Pending",
      },
      buyer: req.user._id,
    });

    res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    console.log(`Error in checking out the user from razorpay  ${error}`);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const order = await Order.findOne({
      "payment.razorpay_order_id": razorpay_order_id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    if (expectedSignature === razorpay_signature) {
      order.payment.razorpay_payment_id = razorpay_payment_id;
      order.payment.status = "Success";
      await order.save();
      res.redirect(`http://localhost:3000/user/payment-verification`);
    } else {
      order.payment.status = "Failed";
      const failedOrder = await order.save();

      res.status(400).json({
        message: "Invalid Razorpay signature, payment failed",
        order: failedOrder,
      });
    }
  } catch (error) {
    console.log(`Error in payment verification: ${error}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
