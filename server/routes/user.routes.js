const express = require("express");
const { protect, isAdmin, isCustomer, isTrucker } = require("../middlewares/auth.middleware.js")
const { signUpUser, logInUser, updateUser, searchUsers, setRating, Loggedinuserid } = require("../controllers/user.controllers");
const { setCargo, getCargoById, getAllCargo, acceptCargo, rejectCargo, allCargoTruck, getAllPendingCargo, completed } = require("../controllers/load.controllers.js");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", logInUser);
router.put("/", protect, updateUser);
router.get("/search", protect, searchUsers);
router.post("/cargo", setCargo);
router.get("/cargo", getCargoById);
router.get("/allcargo", protect, isTrucker, getAllCargo);
router.get("/allcargoP", protect, isTrucker, getAllPendingCargo);
router.post("/ratings", setRating);
router.put("/accept", acceptCargo);
router.put("/reject", rejectCargo);
router.get("/loggedinuserid", Loggedinuserid)
router.get("/allcargo/:truckerId", allCargoTruck);
router.put("/complete", completed)
module.exports = router;