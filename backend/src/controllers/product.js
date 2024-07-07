const ProductService = require("../services/product");

exports.getProducts = async (req, res) => {
  try {
    const { user_id } = req.user;
    const products = await ProductService.getProductsByUserId(user_id);

    return res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Failed to fetch products",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await ProductService.getProduct(req.params.id);

    return res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Failed to fetch product",
    });
  }
};

exports.addProduct = async (req, res) => {
  const { user_id } = req.user;
  try {
    await ProductService.addProduct({ ...req.body, user_id });

    return res.status(200).json({
      status: "success",
      message: "Successfully added product",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Failed to add product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await ProductService.updateProduct(req.body);

    return res.status(200).json({
      status: "success",
      message: "Successfully updated product",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Failed to update product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.id);

    return res.status(200).json({
      status: "success",
      message: "Successfully deleted product",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Failed to delete product",
    });
  }
};
