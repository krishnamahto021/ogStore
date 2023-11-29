const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const { checkAdmin } = require("../middlewares/adminMiddleware");

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.get("/verify-user/:token", userController.verifyUser);

router.post("/forgotten-password", userController.forgottenPassword);
router.post("/update-password/:token", userController.updatePassword);

// test router for protected route in backend
router.get(
  "/testRoute",
  passport.authenticate("jwt", { session: false }),
  checkAdmin,
  (req, res) => {
    res.send("protected route");
  }
);

module.exports = router;
