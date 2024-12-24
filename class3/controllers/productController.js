const ProductModel = require("../models/products");

const createProduct = async (req, res) => {
  console.log("creating product");
  const body = req.body;
  const product = await ProductModel.create({
    product_name: body.product_name,
    product_price: body.product_price,
    isInStock: body.isInStock,
    category: body.category,
  });
  console.log("created product", product);
  return res.status(201).json({ message: "Product created", data: product });
};

const getAllProducts = async (req, res) => {
  const allProducts = await ProductModel.find();
  console.log(allProducts);
  return res
    .status(200)
    .json({ message: "All products", data: allProducts, suucess: true });
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  console.log("fetching details for id", id);
  const product = await ProductModel.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
};

const deleteProductById = async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Product deleted" });
};

const searchProductByName = async (req, res) => {
  const name = req.params.name;
  const product = await ProductModel.find({ product_name: name });
  res.status(200).json(product);
};

const updateProductById = async (req, res) => {
  await ProductModel.findByIdAndUpdate(req.params.id, req.body);
  return res.status(200).json({ message: "Product updated" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  searchProductByName,
  updateProductById,
};
