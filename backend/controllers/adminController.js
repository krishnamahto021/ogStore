const Category = require("../models/categorySchema");
const slugify = require("slug");
const Product = require("../models/productSchema");

// category api
module.exports.createCategory = async (req, res) => {
  try {
    const { name, sizes } = req.body;
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
      sizes,
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

// product api
module.exports.createProduct = async (req, res) => {
  try {
    const { name, images, price, category, sizes } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      images,
      category,
      sizes,
      slug: slugify(name),
    });
    return res.status(201).send({
      message: "Product Added Succesfully",
      success: true,
      newProduct,
    });
  } catch (error) {
    console.log(`Error in creating product ${error}`);
    return res.status(500).send({
      success: false,
      message: "Errror in creating product",
    });
  }
};

module.exports.fetchAllProduct = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      message: "Product fetched successfully",
      totalProducts: products.length,
      success: true,
      products,
    });
  } catch (error) {
    console.log(`Error in fetching product ${error}`);
    return res.status(500).send({
      message: "Error in fetching product",
      success: false,
    });
  }
};

module.exports.fetchSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).send({
        success: true,
        message: "Fetched Product",
        product,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "No such product",
      });
    }
  } catch (error) {
    console.log(`Error in fetching the single Product ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error in fetching single product",
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, slug: slugify(name) },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(`Error in updating product ${error}`);
    return res.status(500).send({
      message: "Error in updating product",
      success: false,
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Product deleted succesfully",
    });
  } catch (error) {
    console.log(`Error in deleting category ${error}`);
    return res.status(500).send({
      message: "Error in deleting Product",
      success: false,
    });
  }
};
