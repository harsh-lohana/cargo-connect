const express = require("express");
const { expectedPay } = require("../controllers/load.controllers");

const router = express.Router();

router.post("/expectedPay", expectedPay);

module.exports = router;
