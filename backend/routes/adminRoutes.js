const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const passport = require("passport");
const { checkAdmin } = require("../middlewares/adminMiddleware");

router.post(
  "/create-category",
  passport.authenticate("jwt", { session: false }),
  checkAdmin,
  adminController.createCategory
);

router.put(
  "/update-category/:id",
  passport.authenticate("jwt", { session: false }),
  checkAdmin,
  adminController.updateCategory
);

router.get("/get-all-category", adminController.getAllCategory);

router.get("/get-single-category/:slug", adminController.getSingleCategory);

router.delete(
  "/delete-category/:id",
  passport.authenticate("jwt", { session: false }),
  checkAdmin,
  adminController.deleteCategory
);

module.exports = router;
