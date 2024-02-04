const mongoose = require("mongoose");
const { boolean } = require("zod");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //role : 0->admin, 1->trucker, 2->consignment poster
    role: {
        type: Number,
        default: 1
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;