const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectToDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED DB!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
