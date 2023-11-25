const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);



module.exports = router;
