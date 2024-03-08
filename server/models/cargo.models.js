const mongoose = require("mongoose");

const cargoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    truckerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    loadingPoint: {
        type: String,
        required: true,
    },
    unloadingPoint: {
        type: String,
        required: true,
    },
    truckType: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    shippingDate: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Cargo = mongoose.model("Cargo", cargoSchema);

module.exports = {Cargo};