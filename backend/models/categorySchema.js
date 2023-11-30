const mongoose = require("mongoose");

const categoryModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});
const Category = mongoose.model("Category", categoryModel);
module.exports = Category;
