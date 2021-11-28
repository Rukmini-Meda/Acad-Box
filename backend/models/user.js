const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    doses: {
        type: Number,
        required: true,
    },
    isFaculty: {
        type: Boolean,
        required: true
    },
    vaccine: {
        type: String,
        required: true
    },
});

module.exports = User = mongoose.model("users", UserSchema);