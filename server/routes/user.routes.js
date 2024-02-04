const express = require("express");
const mongoose = require("mongoose");
const {authMiddleware} = require("../middlewares/auth.miidleware")
const {signUpUser, logInUser, updateUser, searchUsers} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", logInUser);
router.put("/", authMiddleware, updateUser);
router.get("/search", authMiddleware, searchUsers);

module.exports = router;