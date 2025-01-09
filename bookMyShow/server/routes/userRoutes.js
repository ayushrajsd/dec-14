const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/authMiddleware");

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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // you can pass token cookie here
    console.log(token);
    res.send({
      success: true,
      message: "Login Successfull",
      data: token,
    });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 24 * 3600000), // 1 day
    // });
    // res.send({
    //   success: true,
    //   message: "Login Successfull",
    // });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

userRouter.get("/current", auth, async (req, res) => {
  console.log(req.url, req.method);
  console.log("header token", req.headers["authorization"]);
  const user = await User.findById(req.body.userId).select("-password");
  res.send({ success: true, message: "User is authenticated", data: user });
});

module.exports = userRouter; // EXPORT THE ROUTER
