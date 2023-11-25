const User = require("../models/userSchema");

module.exports.checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(400).send({
        success: false,
        message: "not an admin",
      });
    }
    next();
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "error in admin middleware",
      error,
    });
  }
};
