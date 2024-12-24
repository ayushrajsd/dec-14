const UserModel = require("../models/userModels");

const createUser = async (req, res) => {
  console.log("Creating user");
  const { name, email } = req.body;
  try {
    const user = await UserModel.create({
      name,
      email,
    });
    console.log("User created");
    return res.status(201).json({ message: "User created", user });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createUser };
