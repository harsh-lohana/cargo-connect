const CargoType = require('../models/cargotype.model');

//create cargo category
exports.createCargoType = async (req, res, next) => {
    try {
        const jobT = await CargoType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            jobT
        })
    } catch (error) {
        res.status(500).json({success : false, message : "server error"});
    }
}


//all jobs category
exports.allCargosType = async (req, res, next) => {
    try {
        const jobT = await CargoType.find();
        res.status(200).json({
            success: true,
            jobT
        })
    } catch (error) {
        res.status(500).json({success : false, message : "server error"});
    }
}

//update cargo type
exports.updateCargoType = async (req, res, next) => {
    try {
        const jobT = await CargoType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            jobT
        })
    } catch (error) {
        res.status(500).json({success : false, message : "server error"});
    }
}


//delete cargo type
exports.deleteCargoType = async (req, res, next) => {
    try {
        const cargoT = await CargoType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Cargo type deleted"
        })
    } catch (error) {
        res.status(500).json({success : false, message : "server error"});
    }
}