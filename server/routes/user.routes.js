const express = require("express");
const {authMiddleware} = require("../middlewares/auth.miidleware")
const {signUpUser, logInUser, updateUser, searchUsers} = require("../controllers/user.controllers");
const { setCargo , getCargoById , getAllCargo} = require("../controllers/load.controllers.js");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", logInUser);
router.put("/", authMiddleware, updateUser);
router.get("/search", authMiddleware, searchUsers);
router.post("/cargo", setCargo);
router.get("/cargo" ,getCargoById);
router.get("/allcargo" , getAllCargo);


module.exports = router;