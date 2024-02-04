const express = require('express');
const router = express.Router();
const { createCargoType, allCargosType, updateCargoType, deleteCargoType } = require('../controllers/cargotype.controller');
const {authMiddleware, isAdmin} = require("../middlewares/auth.miidleware")

// /api/type/create
router.post('/type/create', authMiddleware, isAdmin, createCargoType)
// /api/type/jobs
router.get('/type/jobs', allCargosType)
// /api/type/update/type_id
router.put('/type/update/:type_id', authMiddleware, isAdmin, updateCargoType)
// /api/type/delete/type_id
router.delete('/type/delete/:type_id', authMiddleware, isAdmin, deleteCargoType)