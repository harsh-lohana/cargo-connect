const express = require("express");
const {authMiddleware} = require("../middlewares/auth.miidleware")
const {signUpUser, logInUser, updateUser, searchUsers , setRating , Loggedinuserid} = require("../controllers/user.controllers");
const { setCargo , getCargoById , getAllCargo, acceptCargo ,allCargoTruck} = require("../controllers/load.controllers.js");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", logInUser);
router.put("/", authMiddleware, updateUser);
router.get("/search", authMiddleware, searchUsers);
router.post("/cargo", setCargo);
router.get("/cargo" ,getCargoById);
router.get("/allcargo" , getAllCargo);
router.post("/ratings" ,setRating); 
router.put("/accept" , acceptCargo);
router.get("/loggedinuserid" , Loggedinuserid)
router.get('/allcargo/:truckerId',allCargoTruck);
module.exports = router;