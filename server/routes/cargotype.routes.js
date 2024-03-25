const express = require('express');
const router = express.Router();
const { createCargoType, allCargosType, updateCargoType, deleteCargoType } = require('../controllers/cargotype.controller');
const {authMiddleware, isAdmin} = require("../middlewares/auth.miidleware")

// /api/type/create
router.post('/create', authMiddleware, isAdmin, createCargoType)
// /api/type/jobs
router.get('/cargos', allCargosType)
// /api/type/update/type_id
router.put('/update/:type_id', authMiddleware, isAdmin, updateCargoType)
// /api/type/delete/type_id
router.delete('/delete/:type_id', authMiddleware, isAdmin, deleteCargoType)

module.exports = router;