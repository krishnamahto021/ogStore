const braintree = require("braintree");
const dotenv = require("dotenv").config;
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

module.exports.braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(`Error in genreating token from braintree ${error}`);
  }
};

module.exports.braintreePaymentController = async (req, res) => {
  try {
    const { order, nonce } = req.body;
  } catch (error) {
    console.log(`error in payment ${error} `);
  }
};
