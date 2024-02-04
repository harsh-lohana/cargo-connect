const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const cargoTypeSchema = new mongoose.Schema({

    cargoTypeName: {
        type: String,
        trim: true,
        required: [true, ' cargo category is required'],
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model("CargoType", cargoTypeSchema);