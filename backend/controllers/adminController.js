const Category = require("../models/categorySchema");
const slugify = require("slug");

module.exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        message: "Name of Category is required!",
      });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(401).send({
        message: "Category Already Exists",
      });
    }

    const newCategory = await Category.create({
      name,
      slug: slugify(name),
    });
    return res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      newCategory,
    });
  } catch (error) {
    console.log(`Error in creating Category ${error}`);
    return res.status(500).send({
      message: "Error in Creating Category",
    });
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id);
    category.name = name;
    category.slug = slugify(name);
    await category.save();
    return res.status(201).send({
      success: true,
      message: "Category updated Successfully",
      category,
    });
  } catch (error) {
    console.log(`Error in updating category ${error}`);
    return res.status(500).send({
      message: "Error in updating the category",
    });
  }
};

module.exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).send({
      success: true,
      message: "Fetched All Category",
      categories,
    });
  } catch (error) {
    console.log(`Error in fetching all category ${error}`);
    return res.status(500).send({
      message: "Error in fetching Category",
    });
  }
};

module.exports.getSingleCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (category) {
      return res.status(200).send({
        messsage: "Found the category",
        success: true,
        category,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "No any Such Category",
      });
    }
  } catch (error) {
    console.log(`Error in fetching single product ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error in fetching the single category",
    });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Category deleted succesfully",
    });
  } catch (error) {
    console.log(`Error in deleting category ${error}`);
    return res.status(500).send({
      message: "Error in deleting Category",
      success: false,
    });
  }
};
