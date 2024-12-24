const mongoose = require("mongoose");

const dbURL = `mongodb+srv://ayushrajsd:IeVYz6YBWXEEcw6Y@cluster0.pxe2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("connected to DB");
  } catch (err) {
    console.log("DB connection failed", err);
  }
};

module.exports = connectDB;
