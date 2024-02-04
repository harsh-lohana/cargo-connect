const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("./db");
const userRouter = require("./routes/user.routes");
const cargoTypeRouter = require("./routes/cargotype.routes");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectToDB();

const PORT = process.env.PORT || 5000;

app.use("/api/user", userRouter);
app.use("/api/type",cargoTypeRouter);

// ---------- depolyment ----------

const __currdir = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__currdir, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__currdir, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    return res.send("API is running!");
  });
}

// ---------- depolyment ----------

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});