const { Product } = require("../db/schema");

exports.getProductsByUserId = async (user_id) => {
  try {
    const products = await Product.find({ user_id });
    return products;
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

exports.getProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.error("Error fetching product", error);
  }
};

exports.addProduct = async (data) => {
  try {
    const product = new Product({ ...data });
    await product.save();
  } catch (error) {
    console.error("Error adding product", error);
  }
};

exports.updateProduct = async (data) => {
  try {
    await Product.findByIdAndUpdate(data._id, { ...data });
    console.log("Successfully updated product");
  } catch (error) {
    console.error("Error updating product", error);
  }
};

exports.deleteProduct = async (id) => {
  try {
    await Product.findByIdAndDelete(id);
    console.log("Successfully deleted product");
  } catch (error) {
    console.error("Error deleting product", error);
  }
};
