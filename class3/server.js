const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./config/db");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

connectDB();
// middlewares
app.use(express.json());

// routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

const PORT = 3000;
app.listen(3000, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});
