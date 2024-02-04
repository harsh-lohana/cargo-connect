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
    isTrucker: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;