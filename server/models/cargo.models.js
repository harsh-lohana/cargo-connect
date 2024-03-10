const mongoose = require("mongoose");

const cargoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    truckerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    },
    //0 -> pending 1-> accepted 2-> completed
    status: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

const Cargo = mongoose.model("Cargo", cargoSchema);

module.exports = {Cargo};