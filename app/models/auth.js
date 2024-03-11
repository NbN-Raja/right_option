const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
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
    role: {
        type: String,
        enum: ["superadmin", "user"],
        default: "superadmin"
    }
});

const Auth = mongoose.model("auth", AuthSchema);

module.exports = Auth;
