const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const { checkAdmin } = require("../middlewares/adminMiddleware");

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);

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
