const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("./db");
const userRouter = require("./routes/user.routes");
const cargoTypeRouter = require("./routes/cargotype.routes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectToDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    msg: "Cargo Connect",
  });
});

app.use("/api/user", userRouter);
app.use("/api/type",cargoTypeRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});