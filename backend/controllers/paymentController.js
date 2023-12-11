const instance = require("../config/razorpay");
const crypto = require("crypto");
module.exports.checkout = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const options = {
      amount: Number(totalAmount * 100),
      currency: "INR",
    };
    const order = await instance.instance.orders.create(options);
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

    if (expectedSignature === razorpay_signature) {
      res.redirect(`http://localhost:3000/user/payment-verification`);
    } else {
      res.status(400).json({
        message: "Invalid Razorpay signature",
        success: false,
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
