const mongoose = require("mongoose");

const InquerySchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,       
    },
    message: {
        type: String,
    },
    updated_At: {
        type: Date,
        default: Date.now
    }
});

const Inquery = mongoose.model("inquiry", InquerySchema);

module.exports = Inquery;
