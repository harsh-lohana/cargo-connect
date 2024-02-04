const  { Cargo } = require("../models/cargo.models");

const setCargo = async (req, res) => {
    try {
        const {
            userId,
            loadingPoint,
            unloadingPoint,
            truckType,
            weight,
            shippingDate,
            deliveryDate
        } = req.body;
        console.log(req.body);

        const newCargo =  await Cargo.create({
            userId,
            loadingPoint,
            unloadingPoint,
            truckType,
            weight,
            shippingDate,
            deliveryDate
        });

       
        const savedCargo = await newCargo.save();

        res.status(201).json(savedCargo);
    } catch (error) {
        // Handle errors, for example, validation errors or database errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getCargoById = async (req, res) => {
    try {
        const cargoId = req.query.id;

        const cargo = await Cargo.findById({_id: cargoId});

        if (!cargo) {
            return res.status(404).json({ error: "Cargo not found" });
        }


        res.status(200).json(cargo);
    } catch (error) {
        // Handle errors, for example, invalid ID format or database errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getAllCargo = async (req, res) => {
    try {
        
        const allCargo = await Cargo.find();

       
        res.status(200).json(allCargo);
    } catch (error) {
    
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




module.exports = { setCargo , getCargoById , getAllCargo };
