const express = require('express');
const router = express.Router();
const { createCargoType, allCargosType, updateCargoType, deleteCargoType } = require('../controllers/cargotype.controller');
const { protect, isAdmin } = require("../middlewares/auth.middleware")

// /api/type/create
router.post('/create', protect, isAdmin, createCargoType)
// /api/type/jobs
router.get('/cargos', allCargosType)
// /api/type/update/type_id
router.put('/update/:type_id', protect, isAdmin, updateCargoType)
// /api/type/delete/type_id
router.delete('/delete/:type_id', protect, isAdmin, deleteCargoType)

module.exports = router;