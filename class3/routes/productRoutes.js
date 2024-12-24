const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProductByName,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.post("/", createProduct);
// HTTP methods - GET, POST, PUT, DELETE ( CRUD ) - Create, Read, Update, Delete
productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProductById);

productRouter.delete("/:id", deleteProductById);
productRouter.get("/search:/name", searchProductByName);

module.exports = productRouter;
