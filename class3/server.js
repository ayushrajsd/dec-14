const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

const dbURL = `mongodb+srv://ayushrajsd:IeVYz6YBWXEEcw6Y@cluster0.pxe2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(dbURL)
  .then(function (connection) {
    console.log("DB connected");
  })
  .catch(function (err) {
    console.log("DB connection failed", err);
  });

// define a schema
const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: String,
      required: true,
    },
    isInStock: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", productSchema);

app.post("/api/products", async (req, res) => {
  const body = req.body;
  const product = await ProductModel.create({
    product_name: body.product_name,
    product_price: body.product_price,
    isInStock: body.isInStock,
    category: body.category,
  });
  console.log(product);
  return res.status(201).json({ message: "Product created", data: product });
});
// HTTP methods - GET, POST, PUT, DELETE ( CRUD ) - Create, Read, Update, Delete
app.get("/api/products", async (req, res) => {
  const allProducts = await ProductModel.find();
  console.log(allProducts);
  return res
    .status(200)
    .json({ message: "All products", data: allProducts, suucess: true });
});

app.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  console.log("fetching details for id", id);
  const product = await ProductModel.findById(id);

  res.status(200).json(product);
});
app.put("/api/products/:id", async (req, res) => {
  await ProductModel.findByIdAndUpdate(req.params.id, req.body);
  return res.status(200).json({ message: "Product updated" });
});

app.delete("/api/products/:id", async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Product deleted" });
});
app.get("/search:/name", async (req, res) => {
  const name = req.params.name;
  const product = await ProductModel.find({ product_name: name });
  res.status(200).json(product);
});

const PORT = 3000;
app.listen(3000, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});
