const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    // console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
