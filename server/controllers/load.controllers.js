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
            deliveryDate,
            truckerId
        } = req.body;
       // console.log(req.body);

        let defaultTruckerId;

        // If truckerId is not provided, use the provided default trucker ID
        if (!truckerId) {
            defaultTruckerId = "65e61156f838e38d9e0ee7d1"; // Use the provided default trucker ID
        }

        const cargoData = {
            userId,
            loadingPoint,
            unloadingPoint,
            truckType,
            weight,
            shippingDate,
            deliveryDate,
            truckerId: truckerId || defaultTruckerId
        };

        const newCargo = await Cargo.create(cargoData);

        const savedCargo = await newCargo.save();

        res.status(201).json(savedCargo);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.sendStatus(500).json({ error: "Internal Server Error" });
    }
};


const getCargoById = async (req, res) => {
    try {
        const cargoId = req.query.id;

        const cargo = await Cargo.findById({_id: cargoId});

        if (!cargo) {
            return res.sendStatus(404).json({ error: "Cargo not found" });
        }


        res.status(200).json(cargo);
    } catch (error) {
        // Handle errors, for example, invalid ID format or database errors
        console.error(error);
        res.sendStatustatus(500).json({ error: "Internal Server Error" });
    }
};


const getAllPendingCargo = async (req, res) => {
    try {
        
        const allCargo = await Cargo.find({ status: 0 });
       
        res.status(200).json(allCargo);
    } catch (error) {
    
        console.error(error);
        res.sendStatus(500).json({ error: "Internal Server Error" });
    }
};

const acceptCargo = async (req, res) => {
    //console.log(req.body);
    const { cargoId, loggedInUserId } = req.body;
    try {
        const cargo = await Cargo.findById(cargoId);
        if (!cargo) {
            return res.status(404).json({ error: "Cargo not found" });
        }

        cargo.truckerId = loggedInUserId;
        cargo.status = 1; // Set status to 1 when accepted

        const updatedCargo = await cargo.save();

        res.status(200).json(updatedCargo);
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ error: "Internal Server Error" });
    }
};

const getAllCargo = async (req, res) => {
    try {
        const allAcceptedCargo = await Cargo.find(); 
        res.status(200).json(allAcceptedCargo);
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ error: "Internal Server Error" });
    }
};


const rejectCargo = async (req, res) => {
    //console.log(req.body);
    const { cargoId, loggedInUserId } = req.body;
    try {
        const cargo = await Cargo.findById(cargoId);
        if (!cargo) {
            return res.status(404).json({ error: "Cargo not found" });
        }

        cargo.truckerId = loggedInUserId;
        cargo.status = 0; // Set status to 0 when rejected

        const updatedCargo = await cargo.save();

        res.status(200).json(updatedCargo);

    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ error: "Internal Server Error" });
    }
};


const allCargoTruck = async(req,res)=>{
    const { truckerId } = req.params;
    console.log(req.params);
    try{
        const allCargo = await Cargo.find({ truckerId, status: 1  });
        res.status(200).json(allCargo);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "kuch gadbad hai"});
    }
}

const expectedPay = async (req, res) => {
    const { cargoId } = req.body;
    console.log(req.body)
    console.log(cargoId)
    try {
      const cargo = await Cargo.findById(cargoId);
      if (!cargo) {
        return res.status(404).json({ error: "Cargo not found" });
      }
      const weight = cargo.weight;
      const price = weight * 100;
      res.send(price.toString()); // Send the price as a string
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  const completed =  async (req,res) => {
    const { cargoId, loggedInUserId } = req.body;
    try {
        const cargo = await Cargo.findById(cargoId);
        if (!cargo) {
            return res.status(404).json({ error: "Cargo not found" });
        }

        cargo.status = 2; // Set status to 2 when completed

        const updatedCargo = await cargo.save();

        res.status(200).json(updatedCargo);

    } catch (error) {
        console.log(error);
    }


  };
  

module.exports = { setCargo , getCargoById , getAllCargo , acceptCargo , rejectCargo,  allCargoTruck , expectedPay ,getAllPendingCargo , completed};
