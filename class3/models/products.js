const mongoose = require("mongoose");
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
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const validCategories = ["electronics", "clothes", "stationery", "furniture"];
productSchema.pre("save", function (next) {
  console.log("pre save hook");
  const invalidCategories = this.category.filter((category) => {
    return !validCategories.includes(category);
  });
  if (invalidCategories.length > 0) {
    // error
    return next(
      new Error(`Invalid categories: ${invalidCategories.join(",")}`)
    );
  } else {
    // success
    next();
  }
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
