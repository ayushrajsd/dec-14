const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  Register,
  Login,
  currentUser,
  ForgetPassword,
  ResetPassword,
} = require("../controllers/userController");

const userRouter = express.Router(); // CREATE A ROUTER object to handle routes for users

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/current", auth, currentUser);
userRouter.post("/forgetPassword", ForgetPassword);
userRouter.post("/resetPassword", ResetPassword);

module.exports = userRouter; // EXPORT THE ROUTER
