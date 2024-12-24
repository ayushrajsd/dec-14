const mongoose = require("mongoose");

// define a schema

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
});

// pre-save hook to add timestamps
userSchema.pre("save", function (next) {
  console.log("Pre save hook");
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

userSchema.post("save", function (doc, next) {
  console.log(`User ${doc.name} and ${doc.email} has been saved`);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
