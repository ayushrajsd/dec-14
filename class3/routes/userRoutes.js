const express = require("express");

const userRouter = express.Router();

const { createUser } = require("../controllers/userController");

userRouter.post("/", createUser); // /api/users POST

module.exports = userRouter;
