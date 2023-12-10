const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const { checkAdmin } = require("../middlewares/adminMiddleware");
const paymentController = require("../controllers/paymentController");
router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.get("/verify-user/:token", userController.verifyUser);

router.post("/forgotten-password", userController.forgottenPassword);
router.post("/update-password/:token", userController.updatePassword);

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);

// admin route
router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  checkAdmin,
  userController.checkAuth
);

router.post(
  "/add-to-cart",
  passport.authenticate("jwt", { session: false }),
  userController.addToCart
);

router.get(
  "/fetch-cart-items",
  passport.authenticate("jwt", { session: false }),
  userController.fetchCartItems
);

router.post(
  "/update-cart",
  passport.authenticate("jwt", { session: false }),
  userController.updateCart
);

// payment routes
router.get("/braintree/token", paymentController.braintreeTokenController);

router.post('/braintree/payment',passport.authenticate('jwt',{session:false}),paymentController.braintreePaymentController);


module.exports = router;
