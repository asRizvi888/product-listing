const ProductController = require("../controllers/product");
const { requireSignin } = require("../services/middleware");

module.exports = (app) => {
  app.get("/api/product/:id", requireSignin, ProductController.getProduct);
  app.get("/api/products", requireSignin, ProductController.getProducts);
  app.post("/api/product", requireSignin, ProductController.addProduct);
  app.put("/api/product", requireSignin, ProductController.updateProduct);
  app.delete(
    "/api/product/:id",
    requireSignin,
    ProductController.deleteProduct
  );
};
