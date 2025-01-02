const express = require("express");
const User = require("../models/userModel");

const userRouter = express.Router(); // CREATE A ROUTER object to handle routes for users

// register a user
userRouter.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        sucess: false,
        message: "User already exists",
      });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "Registration Successfull, Please login",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found, Please register",
      });
    }
    if (req.body.password !== user.password) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }
    res.send({
      success: true,
      message: "Login Successfull",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = userRouter; // EXPORT THE ROUTER
